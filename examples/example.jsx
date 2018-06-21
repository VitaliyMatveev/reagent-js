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
            }
          }
        }}
        onSubmit={data => console.log('res:', data)}
      />
    )
  }
}

export default App
