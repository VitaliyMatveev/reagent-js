import { getFullFieldName } from './utils'

class FormJson {
  constructor() {
    this.data = {}
    this.__promises__ = []
  }
  getFormJson (scheme, form, onReady) {
    this.data = this.__getFieldData___ (scheme, null, form.elements)
    return Promise.all (this.__promises__).then(() => onReady(this.data))
  }
  __registerPromise__ (promise) {
    this.__promises__.push(promise)
  }
  __setValue__ (fullName, value) {
    const parsePath = (str) => str
      .split(/[\[\]]/)
      .filter(el => el)
    let path = parsePath(fullName)
    let name = path.pop()
    path.reduce((res, key) => res[key], this.data)[name] = value
  }

  __getObjectFieldData__ ({properties}, elements, fullName) {
    //console.log('getObjectFieldData', properties, fullName);
    return Object.keys(properties).reduce((values, name) => {
      const value = this.__getFieldData___ (properties[name], name, elements, fullName)
      return {
        ...values,
        [name]: value
      }
    }, {})
  }
  __getFieldData___ (field, fieldName, elements, parentName) {
    //console.log('getFieldData', field, fieldName, parentName)
    let fullName = getFullFieldName ({field, name: fieldName, parentName})
    switch (field.type) {
      case 'object': {
        const {oneOf, name:fieldName} = field
        let name = fieldName ? fieldName : fullName
        if (oneOf) {
          const selected = elements.namedItem(`${name}[title]`).value
          return this.__getObjectFieldData__ (oneOf[selected], elements, name)
        }
        return this.__getObjectFieldData__ (field, elements, name)
      }
      case 'checkbox': {
        const targets = elements.namedItem(`${fullName}[]`)

        if(!targets)
          return []

        if(targets.length == undefined) {
          return (targets.checked ? [targets.value] : [])
        } else {
          return (
            Object.keys(targets).reduce((result, i) => {
              targets[i].checked&&result.push(targets[i].value)
              return result
            },[])
          )
        }
      }
      case 'array': {
        if (field.items.type == 'object') {
          throw new Error('Не поддерживаются массивы с вложенными объектами')
        }
        const els = elements[`${fullName}[]`]
        let res = []
        if (!els) {
          return null
        } else if (els.length) {
          for (var el of els) {
            res.push( this.__getFieldData___(field.items, name, {[`${fullName}[]`]: el}, `${fullName}[]`) )
          }
        } else {
          res.push( this.__getFieldData___(field.items, name, {[`${fullName}[]`]: els}, `${fullName}[]`) )
        }
        return res
      }
      case 'boolean': {
        const target = elements.namedItem(`${fullName}`)
        return target.checked
      }
      case 'file': {
        const { files } = elements.namedItem(fullName)
        if ( files.length > 0 ) {
          const { name: filename, size, lastModified: last_modified, type: mime_type } = files[0]
          this.__registerPromise__(new Promise((resolve) => {
            const fr = new FileReader()
            fr.addEventListener('load', () => {
              this.__setValue__ (fullName, [{
                filename,
                size,
                last_modified,
                mime_type,
                content: fr.result
              }])
              resolve()
            })
            fr.readAsDataURL(files[0])
          }))
          return 'pending...'
        } else {
          return null
        }
      }
      case 'select': {
        const { multiple } = field
        if (multiple) {
          let data = []
          const { children } = elements[`${fullName}[]`]
          for (let el of children) {
            data.push(el.value)
          }
          return data
        } else {
          return elements[fullName].value
        }
      }

      case 'toggle': {
        return elements.namedItem(fullName).checked
      }
      case 'address': {
        const addressPartitionals = [
          'zip',
          'region',
          'sub_region',
          'city',
          'settlement',
          'street',
          'house',
          'building',
          'appartment'
        ]
        return addressPartitionals.reduce((result, name) => {
          const { value } = elements[`${fullName}[${name}]`]
          value ? result[name] = value : null
          return result
        }, {})
      }
      case 'number': {
        return Number.parseFloat(elements[fullName].value)
      }
      case 'time_ranges': {
        const times = elements[fullName].value.match(/\d{2,2}:\d{2,2}/g)
        if (times && times.length == 2) {
          return {
            from: times[0],
            to: times[1]
          }
        } else {
          return null
        }
      }
      default:
        if (!elements[fullName]) throw new Error(`Не найден элемент с именем ${fullName} из схемы ${JSON.stringify(field)}`)
        return elements[fullName].value //&& elements[fullName].value != '' ? elements[fullName].value : null
    }
  }
}

export default FormJson
