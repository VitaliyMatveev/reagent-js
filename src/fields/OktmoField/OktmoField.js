import TextInput from '../TextField/TextInput'

import formField from '../../decorators/formField'
import { OKTMO_FIELD } from '../../constants'

const validate = value => {
  if (value && value.length !== 8 && value.length !== 11) {
    return OKTMO_FIELD.VALIDATE_MESSAGES.INVALID_LENGTH
  }
}

const parse = (value) => {
  if (value && value.length > 0) {
    return value.replace(/\D/g, '').slice(0, 11)
  }
  return value;
};

export default formField({ validate, parse })(TextInput)
