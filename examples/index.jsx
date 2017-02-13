import React from 'react'
import { render } from 'react-dom'
//import { Provider } from 'react-redux'
import { Form } from '../src'
console.log('Form', Form);
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

render (
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
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
  </MuiThemeProvider>,
  document.getElementById('container')
)
