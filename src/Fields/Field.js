import React from 'react'
// import { Field } from 'react-final-form'

import { fields } from './'

export default ({ field, name, required }) => {
  const { type, ...other } = field
  
  //const fieldName = getFullFieldName(props)  
  if (!(type in fields)) {
    throw new Error(`Не найдено описание поля для типа ${type}. Доступные типы: ${Object.keys(fields).join(', ')}`)
  }

  console.log('FIELD', type, name)
  
  const Component =  fields[type]

  return (
    <Component
      required={required}
      name={name}
      {...other}
    />
  )
}
