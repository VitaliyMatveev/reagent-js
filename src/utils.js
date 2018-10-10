import { assocPath } from 'ramda'

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

const setValue = (data, value, path) => assocPath(path, value, data)

const getPath = (path, name) => path ? path.concat(name) : [name]

export const convertData = (data, cb) => {
  const promises = []
  const findFileList = (value, path) => {
    if (!value) {
      return
    }
    if (Array.isArray(value)) {
      value.map((el, index) => findFileList(el, getPath(path, index)))
    }

    if (typeof value === 'object') {
      if (value instanceof FileList) {
        promises.push(parseFile(value, path))
      }
      Object.keys(value).reduce((res, key) => ({
        ...res,
        [key]: findFileList(value[key], getPath(path, key))
      }), {})
    }
  }

  findFileList(data)

  if (promises.length > 0) {
    let result = data
    Promise
    .all(promises)
    .then(res => res.forEach(([path, value]) => {
      result = setValue(result, value, path)
    })
    ).then(() => cb(result))
    .catch(e => console.log('error', e))
  } else {
    cb(data)
  }
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
