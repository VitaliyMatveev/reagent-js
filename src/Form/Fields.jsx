import React, { PropTypes } from 'react'
import FormField from '../FormField/FormField.jsx'
import TextInput from '../Input/TextInput.jsx'
import Switch from '../Switch/Switch.jsx'

export const TextField = (props) => {
  const { title, name, required, onChange, mask, focused } = props
  return (
    <FormField key={name} labelText={title}>
      <TextInput
        name={name}
        required={required}
        onChange={onChange}
        mask={mask}
        focused={focused}
      />
    </FormField>
  )
}

export const SwitchField = (props) => {
  const { title, name, required, onChange, focused } = props
  return (
    <Switch
      key={name}
      name={name}
      label={title}
      required={required}
      onChange={onChange}
      focused={focused}
    />
  )
}

export const SelectField = (props) => {
  const { title, name, required, options, multiple, onChange, focused } = props
  return (
    <FormField key={name} labelText={title}>
      <select name={name}
        ref={c => c&&focused&&c.focus()}
        onChange={e=> onChange(name, e.target.value)}
        onBlur={e=> onChange(name, e.target.value)}        
        required={required}
        multiple={multiple}
        >
        {
          options.map( opt =>
            <option key={opt.value} value={opt.value}>
              {opt.title}
            </option>
          )
        }
      </select>
    </FormField>
  )
}
