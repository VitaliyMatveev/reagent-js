import React, { PropTypes } from 'react'
import MaskedInput from 'react-maskedinput'

import './input.less'

export default function DateInput({ name, value, onChange, required, focused}) {
  return (
    <MaskedInput
      className='c-input_date'
      name={name}
      defaultValue={value}
      required={required}
      mask='11.11.1111'
      onChange={(e) => onChange(name, e.target.value)}
      ref={c => c && focused ? c.focus() : null}
      />
  )
}
