import React, { PureComponent } from 'react'
import { string, bool } from 'prop-types'

import Toggle from 'material-ui/Toggle'

export default class ToggleField extends PureComponent {
  static propTypes = {
    title: string.isRequired,
    name: string.isRequired,
    value: bool,
    defaultValue: bool,
    required: bool
  }

  static getValue = (elements, name) => elements.namedItem(name).checked

  render() {
    const { title, name, value, required, onChange, defaultValue } = this.props
    return (
      <div className='c-field c-toggle-field'>
        <Toggle
          label={title}
          name={name}
          defaultToggled={value || defaultValue}
          onToggle={ onChange }
          required={required}
          labelPosition='right'    
        />
      </div>
    )
  }
}
