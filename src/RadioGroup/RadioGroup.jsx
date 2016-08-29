import React, { PropTypes } from 'react'
import './radio-group.less'

export default function RadioGroup({ items, name, required, value, onChange, focused }){
  return (
    <div className='radio-group'>
      {
        Object.keys(items).map((itemName,i) =>
          <label className='radio-group__label' key={itemName}>
            <input
              required={required}
              className='radio-group__input'
              type='radio'
              onChange={ (e) => onChange(name, e.target.value) }
              defaultChecked={itemName == value}
              value={itemName}
              name={name}
              ref={ c => c&&focused&&i==0&&c.focus() }
              />
            { items[itemName] }
          </label>
        )
      }
    </div>
  )
}

RadioGroup.propTypes={
  items: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  focused: PropTypes.bool
}
