import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'
import { string, bool } from 'prop-types'
import * as validators from '../validators'
import { REQUIRED } from '../constants'

export default function formField({ validate, format, parse } = {}) {
  return WrappedComponent => class FormField extends PureComponent {
    static propTypes = {
      name: string.isRequired,
      required: bool.isRequired,
      title: string,
    }
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
      const { title, required, name, ...rest } = this.props
      const fieldTitle = title ? `${title}${required ? '*' : ''}` : null
      return (
        <Field
          {...rest}
          name={name}
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