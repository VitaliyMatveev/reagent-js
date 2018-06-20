import React, { PureComponent } from 'react'
import MaterialTextField from 'material-ui/TextField'

export default class TextInput extends PureComponent {
  render() {
    const { input, meta, title } = this.props
    const { name, onChange, value, ...rest } = input
    const { error, touched } = meta
    return (
      <MaterialTextField
        name={name}
        fullWidth={true}
        autoComplete={false}
        floatingLabelText={title}
        value={value}
        onChange={onChange}
        errorText={touched && error}
        {...rest}
      />
    )
  }
}
