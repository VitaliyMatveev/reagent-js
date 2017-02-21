import React, { Component } from 'react'
import { Menu, MenuItem } from 'material-ui/Menu'
import {Form} from '../src'
class App extends Component {
  render () {
    return (
      <div>
        <Form
          schema={{
            type: 'date',
            title: 'дата',
            name: 'date'
          }}
        />
      </div>
    )
  }
}

export default App
