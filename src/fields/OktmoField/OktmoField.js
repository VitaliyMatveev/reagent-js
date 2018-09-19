import TextInput from './TextInput'

import formField from '../../decorators/formField'
import { OKTMO_FIELD } from '../../constants'

const validate = value => {
  if (value && value.length !== 8 && value.length !== 11) {
    return OKTMO_FIELD.VALIDATE_MESSAGES.INVALID_LENGTH
  }
}

export default formField({ validate })(TextInput)
