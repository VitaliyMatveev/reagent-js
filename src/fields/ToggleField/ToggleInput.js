import React from 'react'
import Toggle from 'material-ui/Toggle'

export default class ToggleInput extends React.PureComponent {
  render() {
    const {
      input: { name, onChange, value },
      // meta: { error, touched },
      title,
      required,
    } = this.props
    return (
      <div className='c-field c-toggle-field'>
        <Toggle
          label={title}
          name={name}
          toggled={value || false}
          onToggle={onChange}
          required={required}
          type='checkbox'
          labelPosition='right'    
        />
      </div>
    )
  }
}
