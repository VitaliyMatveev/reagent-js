import React from 'react'
import { bool, func } from 'prop-types';
import { Field } from 'react-final-form'

import MaskedTextField from '../MaskedTextField'
import MaterialTextField from 'material-ui/TextField'

import { REQUIRED } from '../../constants';

// const getTitle = ({ title, required }) => `${title}${required ? '*' : ''}`

export default class TextField extends React.PureComponent {
  static propTypes = {
    required: bool,
    validate: func,
  }

  static defaultProps = {
    required: false,
    validate: null,
  }

  validate = (value, allValues) => {
    const { required, validate } = this.props;

    if (required && ['', NaN, null, undefined].includes(value)) {
      return REQUIRED;
    }

    if (validate) {
      return validate(value, allValues);
    }
  }

  renderField = ({
    input: { name, onChange, value, ...input },
    meta: { error, touched, active },
    mask,
    multiLine,
    placeholder,
    title,
  }) => {
    const errorText = touched && error;
    const props = {
      name,
      onChange,
      value,
      ...input,
    };

    return mask ? (
      <MaskedTextField
        error={errorText}
        focused={active}
        mask={mask}
        placeholder={placeholder}
        title={title}
        {...props}
      />
    ) : (
      <MaterialTextField
        autoComplete="off"
        errorText={errorText}
        floatingLabelText={title}
        fullWidth
        hintText={placeholder}
        multiLine={multiLine}
        {...props}
      />
    );
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
