import React, { Component } from 'react'
import { string, bool } from 'prop-types'

import TextField from './TextField'

export default class TimeRange extends Component {
  static propTypes = {
    title: string.isRequired,
    name: string.isRequired,
    value: bool,
    defaultValue: bool,
    required: bool
  }

  static getValue = (elements, name) => {
    const times = elements[name].value.match(/\d{2,2}:\d{2,2}/g)
    if (times && times.length == 2) {
      return {
        start: times[0],
        finish: times[1]
      }
    } else {
      return null
    }
  }

  state={
    error: null
  }

  pattern = '.+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]).+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])'

  _validate = (value) => {
    const times = value.match(/\d{2,2}:\d{2,2}/g) || []
    if (times[0] > times[1]) {
      this.setState({error: 'Не верно задан временной диапазон'})
    } else if (this.state.error) {
      this.setState({error: null})
    }
  }

  getValue = () => {
    const { value } = this.props
    if (value) {
      return `с ${value.start} до ${value.finish}`
    }
    return null
  }

  render() {
    const { name, title, required } = this.props
    const { error } = this.state
    
    return (
      <div>
        <TextField
          name={name}
          mask='с 11:11 до 11:11'
          pattern={this.pattern}
          required={required}
          title={title}
          value={this.getValue()}
          errorText={error}
          onChange={this._validate}
        />
      </div>
    )
  }
}
