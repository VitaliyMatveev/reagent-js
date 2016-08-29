import React, { PropTypes } from 'react'
import FormField from '../FormField/FormField.jsx'
import RadioGroup from '../RadioGroup/RadioGroup.jsx'
import {TextField, SwitchField, SelectField} from './Fields.jsx'
import DateInput from '../Input/DateInput.jsx'

const Form = ({schema, onSubmit, onChange, focused, children}) => {
  return (
    <form onSubmit={e => {
        e.preventDefault()
        onSubmit(e.target.elements)
      }}>
      {buildFormFromSchema(schema, onChange, focused)}
      {children}
    </form>
  )
}

export default Form

Form.propTypes={
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

function buildFormFromSchema(schema, onChange, focused) {
  if(schema.type == 'object' && schema.properties){
    return Object.keys(schema.properties).map( (fieldName,i) => {
      const fieldProperties = schema.properties[fieldName]
      switch (fieldProperties.type) {
        case 'radio':
          return (
            <FormField key={fieldName} labelText={fieldProperties.title}>
              <RadioGroup
                name={fieldName}
                items={fieldProperties.items}
                required={fieldProperties.required}
                onChange={onChange}
              />
            </FormField>
          )
        case 'string':
          return (
            <TextField
              key={fieldName}
              title={fieldProperties.title}
              name={fieldName}
              required={fieldProperties.required}
              onChange={onChange}
              mask={fieldProperties.mask}
              focused={focused&&i==0}
            />
          )
        case 'date':
          return (
            <FormField key={fieldName} labelText={fieldProperties.title}>
              <DateInput
                name={fieldName}
                required={fieldProperties.required}
                onChange={onChange}
                focused={focused&&i==0}
              />
            </FormField>
          )
        case 'boolean':
          return (
            <SwitchField
              key={fieldName}
              name={fieldName}
              title={fieldProperties.title}
              required={fieldProperties.required}
              onChange={onChange}
              focused={focused&&i==0}
            />
          )
        case 'select':
          return (
            <SelectField
              key={fieldName}
              name={fieldName}
              title={fieldProperties.title}
              required={fieldProperties.required}
              options={fieldProperties.options}
              onChange={onChange}
              focused={focused&&i==0}
            />
          )
        case 'file':
          return (
            <FormField key={fieldName} labelText={fieldProperties.title}>
              <input/>
            </FormField>
          )
        case 'object':
          return (
            <div key={fieldName}>Тут объект {fieldName}:{fieldProperties.title}</div>
          )
        default:
          throw new Error(`Схема включает в себя не поддерживаемый тип поля:${fieldProperties.type}`, schema)
      }
    })
  }else{
    throw new Error(`Не валидная схема, отсутствуют properties у элемента с типом Oject`,schema)
  }
}
