import React from 'react'
import Form from '../src'

const FormWithCommonFields = ({ onSubmit }) => 
  <Form
    schema={{
      type: 'object',
      properties: {
        number: {
          type: 'number',
          title: 'Число',
        },
        string: {
          type: 'string',
          title: 'Текст',
        },
        boolean: {
          type: 'boolean',
          title: 'Булево',
        },
        checkbox: {
          type: 'checkbox',
          title: 'Чекбокс',
          items: [{
            id: 0,
            title: 'Ноль',
          }, {
            id: 1,
            title: 'Единица'
          }]
        },
        address: {
          type: 'address',
          title: 'Адрес',
        },
      },
    }}
    onSubmit={onSubmit}
  />

  FormWithCommonFields.title = 'Form with common fields'

export default FormWithCommonFields