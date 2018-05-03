import React from 'react'
import { Field } from 'react-final-form'

import MaskedTextField from '../MaskedTextField'

export default class TimeRangeField extends React.Component {
  pattern = '.+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]).+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])'
  
  format = value => value && `с ${value.start} до ${value.finish}`
  
  parse = value => {
    const pattern = /\d{2,2}:\d{2,2}/g
    const cond = /(\d{2,2}:\d{2,2}).*(\d{2,2}:\d{2,2})/
    
    if (value && cond.test(value)) {
      const times = value.match(pattern)
      return {
        start: times[0],
        finish: times[1],
      }
    }
    return null
  }

  renderField = ({
    input: { name, onChange, value },
    //meta: { error, touched },
    title,
    required,
  }) => (
    <MaskedTextField
      mask='с 11:11 до 11:11'
      // pattern={this.pattern}
      name={name}
      title={title}
      required={required}
      onChange={onChange}
      value={value}
    />
  )

  render() {
    return (
      <Field
        component={this.renderField}
        parse={this.parse}
        format={this.format}
        {...this.props}
      />
    )
  }
}
