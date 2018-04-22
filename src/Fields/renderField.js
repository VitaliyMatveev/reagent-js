import React from 'react'
import { getFullFieldName } from '../utils'

export const fields = {
  string: require('./TextField').default,
  time_ranges: require('./TimeRange').default,
  toggle: require('./ToggleField').default,
  object: require('./ObjectField').default,
}

export default props => {
  const { field, value, defaultValue, required} = props
  const { type } = field
  
  const fieldName = getFullFieldName(props)  
  if (type in fields) {
    const Field = fields[type]
    console.log('[FIELD]', Field)
    return (
      <Field
        name={fieldName}
        required={required}
        defaultValue={value || defaultValue}
        {...field}
      />
    )
  }
  throw new Error(`Не найдено описание поля для типа ${type}. Доступные типы: ${Object.keys(fields).join(', ')}`)
}
