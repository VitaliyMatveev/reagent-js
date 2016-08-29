import React, { PropTypes } from 'react'
import MaskedInput from 'react-maskedinput'

import './input.less'

export default function TextInput({ name, value, mask, placeholder, focused, required, onChange}) {
  if(mask){
    return (
      <MaskedInput
        className='c-input'
        name={name}
        defaultValue={value}
        mask={mask}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        ref={c => c && focused ? c.focus() : null}
        />
    )
  }else{
    return (
      <input
        className='c-input'
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
        ref={c => c && focused ? c.focus() : null}
        />
    )
  }
}
