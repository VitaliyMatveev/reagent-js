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
          }
        }
      }}
      onSubmit={() => {}}
    />
  )
}

export default App
