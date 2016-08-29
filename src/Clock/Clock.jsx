import React, { Component } from 'react'
import './clock.css'

export default class Clock extends Component {
  constructor(props){
    super(props)
    this.state={
      time: new Date()
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date() })
    }, 30000)
  }
  getMonthName(monthNumber){
    return [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек'
    ][monthNumber]
  }

  render(){
    const { time } = this.state
    return (
      <div className='clock'>
        <div className='clock__line'>
          <i className='e-icon icon-calendar'></i>
          <span className='clock__number'>
            { time.getDate() }
          </span>
          <span className='clock__month'>
            { this.getMonthName(time.getMonth()) }
          </span>
        </div>
        <div className='clock__line'>
          <i className='e-icon icon-time'></i>
          <span className='clock__number'>
              { toStandartTimeFormat(time.getHours()) }
          </span>
          <span className='clock__timer'>:</span>
          <span className='clock__number'>
              { toStandartTimeFormat(time.getMinutes()) }
          </span>
        </div>
      </div>
    )
  }
}

function toStandartTimeFormat(value) {  
  if(value.toString().length==1){
    value=`0${value}`
  }
  return value
}
