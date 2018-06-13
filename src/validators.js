export const required = value => !value || value.toString().trim() === ''
export const min = minimum => value => value < minimum
export const max = maximum => value => value > maximum

export const maskedText = (mask, value) => {
  const maskChars = {
    1: '[0-9]',
    a: '[a-zа-я]',
    A: '[A-ZА-Я]',
    '*': '[a-zа-я0-9]',
    '#': '[A-ZА-Я0-9]',
  }
  const regex = mask.split('').map(char => char in maskChars ? maskChars[char] : char).join('')  
  return !RegExp(regex).test(value)
}