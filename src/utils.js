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

function formatString(str, ...args) {
  const regEx = /{\d}/g
  return regEx.test(str) ? str.match(regEx).reduce(
    (result, match, index) => result.replace(match, args[index]), str
  ) : str
}
