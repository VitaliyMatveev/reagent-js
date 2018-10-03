const getDeepestObj = (obj, path) =>
  path.split('.').reduce((res, key) => res[key], obj);

export default function removeFieldsFromState([parentFieldName, propList], { formState: { values }, fields}) {
  const updatedState = parentFieldName ? getDeepestObj(values, parentFieldName) : values;

  propList.map(name => {
    const removedFieldName = parentFieldName ? `${parentFieldName}.${name}` : name;
    fields[removedFieldName].touched = false;
    delete updatedState[name];
  });
}
