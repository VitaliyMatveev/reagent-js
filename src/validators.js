export const required = value => !value || value.toString().trim() === ''
export const min = minimum => value => value < minimum
export const max = maximum => value => value > maximum
