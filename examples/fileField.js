import React from 'react'
import Form from '../src'

const FormWithFiles = ({ onSubmit }) => 
  <Form
    schema={{
      type: 'object',
      properties: {
        case_id: {
          type: 'string',
          title: 'Номер заявки',
        },
        contacts: {
          title: 'Контактные данные',
          type: 'object',
          properties: {
            email: {
              type: 'string',
              title: 'Адрес электронной почты',
            },
            phone: {
              type: 'string',
              title: 'Контактный телефон',
            },
            test: {
              type: 'data'
            }
          },
        },
      },
    }}
    value={{ case_id: '123456', contacts: { test: 'data'} }}
    onSubmit={onSubmit}
  />

  FormWithFiles.title = 'Form with file fields'

export default FormWithFiles