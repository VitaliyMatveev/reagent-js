import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'
import FieldTitle from '../../components/FieldTitle'
import FieldHint from '../../components/FieldHint'

export default class CheckboxInput extends Component {
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

  render() {
    const {
      input,
      meta: { active, error, touched },
      items,
      title,
      required,
    } = this.props

    return (
      <div
        className='c-field'
        ref='field'
      >
        <FieldTitle
          title={title}
          required={required}
          focused={active}
        />
        {
          items.map(this.renderCheckbox.bind(null, input))
        }
        <FieldHint
          text={touched && error}
        />
      </div>
    )
  }
}
