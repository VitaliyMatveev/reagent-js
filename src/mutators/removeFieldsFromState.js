export default function removeFieldsFromState([parentFieldName, propList], { formState: { values }, fields}) {
    const updatedState = parentFieldName ? values[parentFieldName] : values
    propList.map(name => {
      const removedFieldName = parentFieldName ? `${parentFieldName}.${name}` : name
      fields[removedFieldName].touched = false
      delete updatedState[name]
    })
}