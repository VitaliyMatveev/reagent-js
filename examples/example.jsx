import React, { Component } from 'react'
import { Form } from '../src'
import { Menu, MenuItem } from 'material-ui/Menu'
class App extends Component {
  render () {
    console.log('App');
    return (
      <div>
        <Menu>
          <MenuItem
            primaryText='сабмит форты'
            onClick={ () => this.refs.form.submit() }
          />
        </Menu>
        <Form
          ref='form'
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
              },
              address: {
                type: 'address',
                title: 'Адрес'
              },
              file: {
                type: 'file',
                title: 'file'
              },
              file2: {
                type: 'file',
                title: 'file'
              }
            },
            required: ['file', 'file2']
          }}
          value={{date: '11.01.1992'}}
          onSubmit={data => console.log('submit', data)}
        />
      </div>
    )
  }
}

export default App
