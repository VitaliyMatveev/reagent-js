import React, { PureComponent } from 'react'
import Checkbox from 'material-ui/Checkbox'

export default class BooleanInput extends PureComponent {
  render () {
    const { title ,label, meta: { active }, input: { value, onChange, ...input }} = this.props    
    return (
      <div className={`c-field ${active ? 'c-field_focused' : ''}`}>
        {title ? <label className='c-field__label'>{title}</label> : null}
        <Checkbox
          key={`bool-field-${name}`}
          name={name}
          label={label}
          checked={value}
          onCheck={onChange}
          {...input}
        />
      </div>
    )
  }
}
