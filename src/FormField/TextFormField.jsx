import React, { PropTypes } from 'react'

import FormField from './FormField.jsx'

export default function TextFormField({ label, name, value, focused}) {
  return (
    <FormField labelText={ label } >
      <input name={ name } defaultValue={ value } ref={ (c) => c && focused ? c.focus() : null }/>
    </FormField>

  )
}

TextFormField.propTypes={
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}
