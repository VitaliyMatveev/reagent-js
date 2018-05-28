import React, { PureComponent } from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FieldTitle from '../../components/FieldTitle'

export default class RadioButtonInput extends PureComponent {
  renderButton = ({ id, title }) => (
    <RadioButton
      key={id}
      value={String(id)}
      label={title}
      required={this.props.required}
      onFocus={this.props.input.onFocus}
      onBlur={this.props.input.onBlur}
    />
  )

  render () {
    const { style, items, title, required, input: { name, value, onChange }, meta: { active } } = this.props
    return (
      <div className='c-field c-toggle-field'>
        <FieldTitle
          title={title}
          required={required}
          focused={active}
        />
        <RadioButtonGroup
          name={name}
          valueSelected={String(value)}
          style={style}
          onChange={onChange}
        >
          { items.map(this.renderButton) }
        </RadioButtonGroup>
      </div>
    )
  }
}
