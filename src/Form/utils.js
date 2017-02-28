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
