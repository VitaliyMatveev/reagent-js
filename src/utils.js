export function formatString(str, ...args) {
  const regEx = /{\d}/g
  return regEx.test(str) ? str.match(regEx).reduce(
    (result, match, index) => result.replace(match, args[index]), str
  ) : str
}

export const parseDateStr = value => {
  if (!value) return null

  if (value.includes('_')) {
    throw new Error('has_underscore')
  }

  const dateParts = value.split('.')
  const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)

  if (date == 'Invalid Date') {
    throw new Error('invalid_date')
  }
  return date
}

const parseFile = (files, path) => {
  if (files.length > 0) {
    const { name: filename, size, lastModified: last_modified, type: mime_type } = files[0]
    return new Promise((resolve) => {
      const fr = new FileReader()
      fr.addEventListener('load', () => resolve([
        path,
        [{
          filename,
          size,
          last_modified,
          mime_type,
          content: fr.result
        }]
      ]))

      fr.readAsDataURL(files[0])
    })
  }
  return null
}

const getObjectPropertiesValue = (properties, value) => {
  const keys = Object.keys(properties)
  return Promise.all(keys.map(name => getFieldValue(properties[name], value[name]))).then(values => values.reduce(
    (result, item, index) => {
      result[keys[index]] = item
      return result
    }, {})
  )
}

export const getFieldValue = async (field, value) => {
  if (!field.type) {
    throw new Error('Field must have type property', field)
  }
  if (field.type === 'object') {
    if (field.oneOf) {
      const { properties } = field.oneOf.find(props => props.id === value[field.oneOfFieldName])
      return getObjectPropertiesValue(properties, value)
    }
    return getObjectPropertiesValue(field.properties, value)
  }
  if (field.type === 'array') {
    return await value && Promise.all(value.map(item => getFieldValue(field.items, item)))
  }
  if (field.type === 'file') {
    return await parseFile(value)
  }
  return value
}

export const lengthValidator = ({ length, message, validate }) => (value, name) => {
  if (value && ![].concat(length).includes(value.length)) {
    return message;
  }

  if (validate) {
    return validate(value, name);
  }

  return null;
};

export const lengthParser = ({ length, parse }) => (value, allValues) => {
  let newVal = value;

  if (value && value.length) {
    const maxLength = Math.max(...[].concat(length));
    newVal = newVal.replace(/\D/g, '').slice(0, maxLength);
  }

  if (parse) {
    newVal = parse(newVal, allValues);
  }

  return newVal;
};
