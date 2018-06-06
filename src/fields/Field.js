import React from 'react'
import { object, shape, string, bool, arrayOf } from 'prop-types'

export default class FormField extends React.PureComponent {
  static contextTypes = {
    fields: object,
  }

  static propTypes = {
    field: shape({
      type: string.isRequired,
      required: arrayOf(string),
    }),
    name: string,
    required: bool,
  }

  getRequired = () => {
    const { field, required } = this.props
    if (field.type !== 'object') {
      return required
    }
    if (required) {
      return field.required
    }
    return []
  }

  render() {
    const { field: { type, ...other }, name } = this.props
    const { fields } = this.context
    
    if (!(type in fields)) {
      throw new Error(`Не найдено описание поля для типа ${type}. Доступные типы: ${Object.keys(fields).join(', ')}`)
    }

    const Component =  fields[type]
    const required = this.getRequired()
    return (
      <Component      
        name={name}
        {...other}
        required={required}
      />
    )
  }
}
