import React from 'react'
import Form from '../src'

const FormWithArrays = ({ onSubmit }) => 
  <Form
    schema={{
      type: 'object',
      properties: {
        pure: {
          type: 'array',
          title: 'Pure array field with string items',
          items: {
            type: 'string',
            title: 'Array item'
          }
        },
        withValidations: {
          type: 'array',
          title: 'Array field with min 1 and max 4 items',
          min: 1,
          max: 4,
          items: {
            type: 'string',
            title: 'Array item'
          }
        }
      }
    }}
    onSubmit={onSubmit}
  />

FormWithArrays.title = 'Form with array fields'

export default FormWithArrays