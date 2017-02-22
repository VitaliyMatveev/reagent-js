import React, { Component } from 'react'
import { Menu, MenuItem } from 'material-ui/Menu'
import {Form} from '../src'
class App extends Component {
  render () {
    return (
      <div>
        <Form
          schema={{
            type: 'object',
            properties: {
              select: {
                type: 'select',
                multiple: true,
                items: [{
                  id: '1',
                  title: 'test'
                },{
                  id: '2',
                  title: 'test2',
                  disabled: true
                },{
                  id: '3',
                  title: 'test3'
                },{
                  id: '4',
                  title: 'test4'
                }]
              }
            }
          }}
          value={{
            select: [2]
          }}
        />
      </div>
    )
  }
}

export default App
