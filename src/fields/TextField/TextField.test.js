import React from 'react'
import TextField from './TextField'
import { object } from 'prop-types'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme()

describe('TextField', () => {
  it('should render', () => {
    expect(mount(<TextField />, {
      context: { muiTheme },
      childContextTypes: {
        muiTheme: object.isRequired,
      }
    }).find('input')).toHaveLength(1)
  })
})