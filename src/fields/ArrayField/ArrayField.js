import React, { PureComponent } from 'react'

import { FieldArray } from 'react-final-form-arrays'
import ArrayInput from './ArrayInput'

export default class ArrayField extends PureComponent {
  render() {
    return (
      <FieldArray 
        {...this.props}
        component={ArrayInput}
      />
    )
  }
}
