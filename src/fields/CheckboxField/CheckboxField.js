import React, { Component } from 'react'
import { Field } from 'react-final-form'

import Checkbox from 'material-ui/Checkbox'
import FieldTitle from '../../components/FieldTitle'

export default class CheckboxField extends Component { 
  handleChange = (id, {value, onChange}) => {
    if (value) {
      return onChange(value.includes(id) ? value.filter(el => el !== id) : value.concat(id))
    }
    return onChange([id])
  }

  isChecked = (item, value) => value && value.includes(item.id)
  
  renderCheckbox = ({ value, onChange, ...input }, { id, title }) => (
    <Checkbox
      key={id}
      name={name}
      label={title}
      onCheck={this.handleChange.bind(null, id, { value, onChange })}
      checked={this.isChecked({ id, title }, value)}
      {...input}
    />
  )

  //parse = ()
  renderField = ({
    input,
    meta: { active },
    items,
    title,
    required,
  }) => (
    <div>
      <FieldTitle
        title={title}
        required={required}
        focused={active}
      />
      {
        items.map(this.renderCheckbox.bind(null, input))
      }
    </div>
  )

  render() {
    return (
      <div
        className='c-field'
        ref='field'
      >
        <Field
          component={this.renderField}
          //type='checkbox'
          multiple
          value={[]}
          format={this.format}
          {...this.props}
        />
      </div>        
    )
  }
}
