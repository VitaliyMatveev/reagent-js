import formField from '../../decorators/formField'
import { TIME_RANGE_FIELD } from '../../constants'


import TimeRangeInput from './TimeRangeInput'

const format = value => value && value.start ? `с ${value.start} до ${value.finish}`: value
  
const parse = value => {
  const pattern = /\d{2,2}:\d{2,2}/g
  const cond = /(\d{2,2}:\d{2,2}).*(\d{2,2}:\d{2,2})/
  
  if (value && cond.test(value)) {
    const times = value.match(pattern)
    return {
      start: times[0],
      finish: times[1],
    }
  }
  return value
}

const validate = (value) => {
  if (typeof value === 'string') {
    return TIME_RANGE_FIELD.VALIDATE_MESSAGES.PATTERN_MISMATCH
  }
  if (value && value.start > value.finish) {
    return TIME_RANGE_FIELD.VALIDATE_MESSAGES.INVALID_TIME
  }
}

export default formField({ format, parse, validate })(TimeRangeInput)
