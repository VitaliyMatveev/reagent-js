import React, { PropTypes, Component } from 'react'
import MaskedInput from 'react-maskedinput'
import TextField from './TextField'

class TimeRange extends Component {
  constructor(props){
    super(props)
    this.state={
      error: null
    }
  }
  _validate = (value) => {
    const times = value.match(/\d{2,2}:\d{2,2}/g) || []
    if (times[0] > times[1]) {
      this.setState({error: 'Не верно задан временной диапазон'})
    } else if (this.state.error) {
      this.setState({error: null})
    }
  }

  render() {
    const {name, value, title, required} = this.props
    const {error} = this.state
    // const style = {
    //   outline: 0,
    //   border: 0,
    //   padding: '0.5rem',
    //   fontSize: '1rem',
    //   width: '40px'
    //   //textAlign: 'center'
    // }
    return (
      <div
        style={{
          //width: '9rem',
        }}
        >
        <TextField
          name={name}
          mask='с 11:11 до 11:11'
          pattern='.+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]).+(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])'
          required={required}
          title={title}
          value={ value ? `с ${value.start} до ${value.finish}` : null}
          errorText={error}
          onChange={this._validate}
        />
      </div>
    )
  }
}

export default TimeRange
