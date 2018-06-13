import React from 'react'
import { Field } from 'react-final-form'
import MaskedTextField from '../MaskedTextField'
import MaterialTextField from 'material-ui/TextField'
import * as validators from '../../validators'
import { TEXT_FIELD } from '../../constants'
import { formatFieldTitle } from '../../utils';

// const getTitle = ({ title, required }) => `${title}${required ? '*' : ''}`

export default class TextField extends React.PureComponent {
  static defaultProps = {
    validate: [],
  }
  renderField = ({
    input: { name, onChange, value, ...input },
    meta: { error, touched, active },
    mask,
    title,
    required,
  }) => mask ? (
    <MaskedTextField
      mask={mask}
      name={name}
      title={formatFieldTitle(title, required)}
      onChange={onChange}
      value={value}
      error={touched && error}
      focused={active}
      {...input}
    />
  ) : (
    <MaterialTextField
      name={name}
      fullWidth={true}
      autoComplete={false}
      floatingLabelText={formatFieldTitle(title, required)}
      value={value}
      onChange={onChange}
      errorText={touched ? error : undefined}
      error={error && touched}
      {...input}
    />
  )
  validate = value => {
    const { required, mask } = this.props
    if (required && validators.required(value)) {
      return TEXT_FIELD.VALIDATE_MESSAGES.REQUIRED
    }
    console.log('test', mask, value)
    if(mask && validators.maskedText(mask, value)) {
      return TEXT_FIELD.VALIDATE_MESSAGES.PATTERN_MISMATCH
    }
  }
  render() {
    return (
      <Field
        {...this.props}
        component={this.renderField}
        validate={this.validate}
      />
    )
  }
}
