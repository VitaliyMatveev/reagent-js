import React, { PropTypes } from 'react'
import './switch.less'

export default function Switch(props){
  const { label, name, onChange, defaultValue, focused, disabled } = props
  return(
    <div className='switch'>
      <span className='switch__label'>{ label }</span>
      <input type='checkbox' id={ name } name={ name } className='switch__input'
        defaultChecked={ defaultValue }
        disabled={ disabled }
        onChange={ (e) => onChange&&onChange(name, e.target.checked) }
        ref={ c => c&&focused&&c.focus()}
      />
      <label className='switch__item' htmlFor={ name }></label>
    </div>
  )
}

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
  focused: PropTypes.bool,
  disabled: PropTypes.bool
}
