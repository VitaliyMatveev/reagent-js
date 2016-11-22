import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import Field from './Fields/Field'
import './style.css'

const getObjectFieldData = ({properties}, elements, fullName) => Object.keys(properties).reduce((values, name) => {
  const fieldData = getFieldData(properties[name], name, elements, fullName)
  //console.log('fieldData', name, fieldData)
  return ({
    ...values,
    [name]: fieldData
  })
},{})

const getFieldData = (field, fieldName, elements, parentName) => {
  let fullName = fieldName ? parentName ? `${parentName}[${fieldName}]` : `${fieldName}` : ''
  switch (field.type) {
    case 'object': {
      //console.log('objectGetData', field, fieldName, parentName);
      const {oneOf, name:fieldName} = field
      let name = fieldName ? fieldName : fullName
      if (oneOf) {
        const selected = elements.namedItem(`${name}[title]`).value
        return getObjectFieldData(oneOf[selected], elements, name)
      }
      return getObjectFieldData(field, elements, name)
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
      console.log(elements)
      return []
    }
    case 'boolean': {
      const target = elements.namedItem(`${fullName}`)
      return target.checked
    }
    case 'file': {
      return elements.namedItem(`${fullName}[data]`)
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

    default:
      if (!elements[fullName]) throw new Error(`Не найден элемент с именем ${fullName} из схемы ${JSON.stringify(field)}`)
      return elements[fullName].value //&& elements[fullName].value != '' ? elements[fullName].value : null
  }
}

class Form extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.submit = () => this.refs.submitButton.click()
  }
  _handleSubmit(e){

    const {onSubmit, schema, type='application/json'} = this.props
    e.preventDefault();
    const {elements} = e.target
    if (type=='multipart/form-data') {
      let formData = new FormData(e.target)
      onSubmit(formData, type)
    } else {
      const data = getFieldData(schema, schema.name, elements)      
      onSubmit(data)
    }
  }

  render () {
    const {controls, style, direction='vertical',onCancel, schema, required, value, defaultValue, hideControls} = this.props
    const defaultControls = hideControls ? <button type='submit' ref='submitButton' style={{display: 'none'}}/> : [
      <RaisedButton
        key='submit'
        type='submit'
        labelPosition='before'
        icon={<SaveIcon/>}
        primary={true}
        label='Сохранить'
        style={{marginRight: '0.25rem'}}
      />,
      <RaisedButton
        key='cancel'
        secondary={true}
        labelPosition='before'
        icon={<CloseIcon/>}
        label='Отмена'
        onClick={onCancel}
      />
    ]
    return (
      <form
        className={`c-editor-panel ${direction=='vertical' ? 'c-editor-panel_vertical' : ''}`}
        style={style}
        ref='form'
        onSubmit={this._handleSubmit.bind(this)}
        >
        <div className='c-editor-panel__content'>
          <Field
            field={{...schema}}
            required={required}
            type={schema.type}
            value={value}
            defaultValue={defaultValue}
          />
        </div>
        <div className='c-editor-panel__controls'>
          {controls || defaultControls}
        </div>
      </form>
    )
  }
}



export default Form

export TextField from 'material-ui/TextField'
export RichTextField from './Fields/RichTextField'
export SelectField from './Fields/SelectField'
export FileField from './Fields/FileField'
export ObjectField from './Fields/ObjectField'
export RadioField from './Fields/RadioField'
export ToggleField from './Fields/ToggleField'
export DateField from './Fields/DateField'
