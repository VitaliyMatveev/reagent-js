import React from 'react'
import { Form } from '../src'

const App = () => {
  console.log('App');
  return (
    <Form
      schema={{
        type: 'object',
        properties: {
          date: {
            type: 'date',
            title: 'Дата'
          },
          date2: {
            type: 'date',
            title: 'test'
          },
          text: {
            type: 'string',
            title: 'Строка'
          }
        }
      }}
      value={{date: '11.01.1992'}}
      onSubmit={() => {}}
    />
  )
}

export default App
