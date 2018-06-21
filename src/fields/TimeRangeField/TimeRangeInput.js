import React from 'react'
import MaskedTextInput from '../TextField/MaskedTextInput'

export default class TimeRangeInput extends React.Component {
  render() {
    return (
      <MaskedTextInput
        {...this.props}
        mask='с 11:11 до 11:11'
      />
    )
  }
}
