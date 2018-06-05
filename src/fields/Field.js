import React from 'react'
import { func } from 'prop-types'

import { fields } from './'

export default class FormField extends React.PureComponent {
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
    const { field, name } = this.props
    const { type, ...other } = field
    
    //const fieldName = getFullFieldName(props)  
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
