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
            select: {
              items: Array.from(Array(50)).map((_, index) => ({ id: index, title: `Item ${index}` })),
              multiple: true,
              title: 'Field of type "select" with property "multiple: true"',
              type: 'select',
            }
          }
        }}
        onSubmit={data => console.log('res:', data)}
      />
    )
  }
}

export default App
