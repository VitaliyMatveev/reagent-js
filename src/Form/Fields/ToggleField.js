import React, { PropTypes } from 'react'
import Toggle from 'material-ui/Toggle'

const ToggleField = ({title, name, value, required, defaultValue}) => (
  <div className='c-field c-toggle-field'>
    <Toggle
      label={title}
      name={name}
      defaultToggled={value || defaultValue}
      required={required}
      labelPosition='right'
      labelStyle={{
        color: 'inherit'
      }}
    />
  </div>
)

ToggleField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  defaultValue: PropTypes.bool,
  required: PropTypes.bool
}

export default ToggleField
