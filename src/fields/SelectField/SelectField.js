import React from 'react'

import formField from '../../decorators/formField'
import * as validators from '../../validators'
import { SELECT_FIELD } from '../../constants'

import SelectInput from './SelectInput'
import SelectInputWithDialog from './SelectInputWithDialog'

const validate = (value, { max, min }) => {
  if (max && max > 1 && value && validators.max(max)(value.length)) {
    return SELECT_FIELD.VALIDATE_MESSAGES.MAX(max)
  }
  if (min && validators.min(min)(value.length)) {
    return SELECT_FIELD.VALIDATE_MESSAGES.MIN(min)
  }
  return null
}

const SelectField = props => props.multiple ? (
  <SelectInputWithDialog {...props} />
) : (
  <SelectInput {...props} />
)

export default formField({ validate })(SelectField)
