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
