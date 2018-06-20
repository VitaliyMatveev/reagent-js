import formField from '../../decorators/formField'
import { DATE_FIELD } from '../../constants'
import { date } from '../../validators'

import DateInput from './DateInput'

const validate = value => {
  if (value && date(value)) {
    return DATE_FIELD.VALIDATE_MESSAGES.INVALIDATE_DATE
  }
}

export default formField({ validate })(DateInput)
