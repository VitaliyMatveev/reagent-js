import React, { PureComponent } from 'react'
import MaterialTextField from 'material-ui/TextField'

export default class TextInput extends PureComponent {
  render() {
    const { input, meta, multiLine, placeholder, title } = this.props
    const { name, onChange, value, ...rest } = input
    const { error, touched } = meta
    return (
      <MaterialTextField
        name={name}
        fullWidth={true}
        autoComplete="off"
        floatingLabelText={title}
        value={value}
        onChange={onChange}
        errorText={touched && error}
        hintText={placeholder}
        multiLine={multiLine}
        {...rest}
      />
    )
  }
}
