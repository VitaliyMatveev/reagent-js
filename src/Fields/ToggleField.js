import React from 'react'
import { Field } from 'react-final-form'

import Toggle from 'material-ui/Toggle'

export default class ToggleField extends React.PureComponent {
  renderField = ({
    input: { name, onChange, value },
    // meta: { error, touched },
    title,
    required,
  }) => (
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

  render() {
    return (
      <Field
        component={this.renderField}
        {...this.props}
      />
    )
  }
}
