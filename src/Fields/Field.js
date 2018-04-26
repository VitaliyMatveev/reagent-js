import React from 'react'
import { func } from 'prop-types'

import { fields } from './'

export default class FormField extends React.PureComponent {
  render() {
    const { field, name, required } = this.props
    const { type, ...other } = field
    
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
