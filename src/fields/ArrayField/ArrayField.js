import React, { PureComponent } from 'react'

import { FieldArray } from 'react-final-form-arrays'
import ArrayInput from './ArrayInput'

import { ARRAY_FIELD } from '../../constants'

export default class ArrayField extends PureComponent {
  validate = value => {
    const { max, min, required } = this.props
    if (value && max && max < value.length) {
      return ARRAY_FIELD.VALIDATE_MESSAGES.MAX(max)
    }
    if (min && (!value || value.length < min)) {
      return ARRAY_FIELD.VALIDATE_MESSAGES.MIN(min)
    }
    if (required && (!value || value.length === 0)) {
      return ARRAY_FIELD.VALIDATE_MESSAGES.REQUIRED
    }
    return null
  }

  render() {
    return (
      <FieldArray 
        {...this.props}
        validate={this.validate}
        component={ArrayInput}
      />
    )
  }
}
