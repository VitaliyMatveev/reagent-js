import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'

import { DATE_FIELD } from '../../constants'
import * as validators from '../../validators'
import { parseDateStr } from '../../utils'

import DateInput from './DateInput'

const validateDate = value => {
  if (!value) return null
  try {
    parseDateStr(value)
    return false
  } catch(e) {
    return true
  }
}

export default class DateField extends PureComponent {
  validate = value => {
    const { required } = this.props
    if (required && validators.required(value)) {
      return DATE_FIELD.VALIDATE_MESSAGES.REQUIRED
    }
    if (value && validateDate(value)) {
      return DATE_FIELD.VALIDATE_MESSAGES.INVALIDATE_DATE
    }
  }
  
  render() {
    return (
      <Field
        {...this.props}
        component={DateInput}
        validate={this.validate}
      />
    )
  }
}