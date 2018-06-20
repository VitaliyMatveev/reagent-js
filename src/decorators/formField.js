import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'

import * as validators from '../validators'
import { REQUIRED } from '../constants'

export default function formField({ validate, format, parse } = {}) {
  return WrappedComponent => class FormField extends PureComponent {
    validate = value => {
      const { required, validate: fieldValidate } = this.props
      if (required && validators.required(value)) {
        return REQUIRED
      }
      if (validate && validate(value, this.props)) {
        return validate(value, this.props)
      }
      if (fieldValidate && fieldValidate(value, this.props)) {
        return fieldValidate(value, this.props)
      }
      return null
    }

    render() {
      const { title, required, ...rest } = this.props
      const fieldTitle = title ? `${title}${required ? '*' : ''}` : null
      return (
        <Field
          {...rest}
          format={format}
          parse={parse}
          title={fieldTitle}
          component={WrappedComponent}
          validate={this.validate}
        />
      )
    }
  }
}