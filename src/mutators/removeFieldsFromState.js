const getField = (obj, path) => {
  let deepestObj = {...obj};
  path.split('.').forEach(key => deepestObj = deepestObj[key]);
  return deepestObj;
};

export default function removeFieldsFromState([parentFieldName, propList], { formState: { values }, fields}) {
    const updatedState = parentFieldName ? getField(values, parentFieldName) : values

    propList.map(name => {
      const removedFieldName = parentFieldName ? `${parentFieldName}.${name}` : name;
      fields[removedFieldName].touched = false;
      delete updatedState[name];
    })
}
