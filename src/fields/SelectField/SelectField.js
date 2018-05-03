import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'
import SelectInput from './SelectInput'
import SelectInputWithDialog from './SelectInputWithDialog'

export default class SelectField extends PureComponent {
  render() {
    const { multiple, ...props } = this.props
    return (
      <Field
        {...props}
        component={multiple ? SelectInputWithDialog : SelectInput}
      />
    )
  }
}