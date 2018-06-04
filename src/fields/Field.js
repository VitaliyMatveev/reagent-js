import React from 'react'
import { object, shape, string, bool } from 'prop-types'

export default class FormField extends React.PureComponent {
  static contextTypes = {
    fields: object,
  }

  static propTypes = {
    field: shape({
      type: string.isRequired,
    }),
    name: string,
    required: bool,
  }

  render() {
    const { field, name, required } = this.props
    const { fields } = this.context
    const { type, ...other } = field
    console.log('fields', fields)
    //const fieldName = getFullFieldName(props)  
    if (!(type in fields)) {
      throw new Error(`Не найдено описание поля для типа ${type}. Доступные типы: ${Object.keys(fields).join(', ')}`)
    }

    const Component =  fields[type]
    
    return (
      <Component
        required={required}
        name={name}
        {...other}
      />
    )
  }
}
