export const getFullFieldName = ({field, parentName, name}) => {
  //console.log('getFullFieldName', field, parentName, name);
  if (field.name){
    return field.name
  } else if (!name) {
    return parentName
  } else {
    return parentName ? `${parentName}[${name}]` : name
  }
}

export const getText = (defaultTemplates, templates, param, ...args) => (
  formatString( templates && templates[param] || defaultTemplates[param], ...args )
)

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

export const formatFieldTitle = (title, required) => `${title}${required ? '*' : ''}`