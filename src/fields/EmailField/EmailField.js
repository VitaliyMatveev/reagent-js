import TextInput from '../TextField/TextInput'

import formField from '../../decorators/formField'
import { EMAIL_FIELD } from '../../constants'

const validate = value => {
  if (value && !value.match(EMAIL_FIELD.REGEX)) {
    return EMAIL_FIELD.VALIDATE_MESSAGES.INVALID
  }
}

export default formField({ validate })(TextInput)
