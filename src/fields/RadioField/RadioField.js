import React, { Component } from 'react'
import { Field } from 'react-final-form'
import * as validators from '../../validators'
import { RADIO_FIELD } from '../../constants'

import RadioButtonInput from './RadioButtonInput'

export default class RadioField extends Component {
  validate = value => {
    const { required } = this.props
    if (required && validators.required(value)) {
      return RADIO_FIELD.VALIDATE_MESSAGES.REQUIRED
    }
  }

  render () {
    return (
      <Field
        {...this.props}
        allowNull
        component={RadioButtonInput}
        validate={this.validate}
      />
    )
  }
}
