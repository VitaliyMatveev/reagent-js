import React, { PureComponent } from 'react'

import { FieldArray } from 'react-final-form-arrays'
import ArrayInput from './ArrayInput'

import { ARRAY_FIELD } from '../../constants'

export default class ArrayField extends PureComponent {
  validate = value => {
    const { max, min } = this.props
    if (value && max && max < value.length) {
      return ARRAY_FIELD.VALIDATE_MESSAGES.MAX(max)
    }
    if (min && (!value || value.length < min)) {
      return ARRAY_FIELD.VALIDATE_MESSAGES.MIN(min)
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
