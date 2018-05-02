import React from 'react'
import { Field } from 'react-final-form'

import MaskedTextField from '../MaskedTextField'
import MaterialTextField from 'material-ui/TextField'

// const getTitle = ({ title, required }) => `${title}${required ? '*' : ''}`

export default class TextField extends React.PureComponent {
  renderField = ({
    input: { name, onChange, value, ...input },
    meta: { error, touched },
    mask,
    title,
    required,
    defaultValue,
  }) => mask ? (
    <MaskedTextField
      mask={mask}
      name={name}
      title={title}
      required={required}
      onChange={onChange}
      value={value || defaultValue || ''}
      {...input}
    />
  ) : (
    <MaterialTextField
      name={name}
      fullWidth={true}
      autoComplete={false}
      floatingLabelText={title}
      required={required}
      value={value || defaultValue || ''}
      onChange={onChange}
      helperText={touched ? error : undefined}
      error={error && touched}
      {...input}
    />
  )
  render() {
    return (
      <Field
        component={this.renderField}
        {...this.props}
      />
    )
  }
}
