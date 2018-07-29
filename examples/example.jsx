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
