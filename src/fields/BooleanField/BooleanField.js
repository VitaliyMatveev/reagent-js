import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'
import BooleanInput from './BooleanInput'

export default class BooleanField extends PureComponent {
  render() {
    return (
      <Field
        {...this.props}
        component={BooleanInput}
        type='checkbox'
      />
    )
  }
}