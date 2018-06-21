import React, { Component } from 'react'
import Form from '../src'

class App extends Component {
  render() {
    return (
      <Form
        schema={{
          type: 'object',
          properties: {
            key: {
              type: 'string',
              value: 'one',
              title: 'First'
            },
            input: {
              type: 'string',
              title: 'String'
            },
            inputNumber: {
              max: 10,
              min: -10,
              placeholder: 'placeholder',
              step: 0.01,
              title: 'Number',
              type: 'number',
            },
          },
          required: ['inputNumber'],
        }}
        onSubmit={data => console.log('res:', data)}
      />
    )
  }
}

export default App
