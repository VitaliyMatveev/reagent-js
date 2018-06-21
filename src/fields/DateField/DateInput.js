import React, { PureComponent } from 'react'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import MaskedTextInput from '../TextField/MaskedTextInput'
import Avatar from 'material-ui/Avatar'
import Calendar from 'material-ui/svg-icons/action/today'

import { parseDateStr } from '../../utils'

export default class DateInput extends PureComponent {
  handleAccept = date => {
    this.props.input.onChange(date.toLocaleDateString('ru'))
  }

  showCalendar = () => this.refs.dialog.show()

  hideCalendar = () => this.refs.dialog.setState({open: false})

  handleKeyPress = e => {
    switch (e.keyCode) {
      case 32: {
        this.showCalendar()
        break
      }
      case 27: {
        this.hideCalendar()
        break
      }
      case 13: {
        this.refs.dialog.state.open && e.preventDefault()
      }
    }
  }

  getDate = () => {
    const { input: { value }} = this.props
    try {
      return parseDateStr(value) || new Date()
    } catch (error) {
      return new Date()
    }
  }

  render() { 
    return (
      <div
        className='c-field c-date-field'
        onKeyDown={this.handleKeyPress}
        >
        <MaskedTextInput
          {...this.props}
          mask='11.11.1111'
          pattern='\d{2,2}.\d{2,2}.\d{4,4}'
          autoComplete={false}
        />
        <Avatar
          size={32}
          className='c-date-field__button'
          onClick={this.showCalendar}
          icon={<Calendar/>}
        />
        <DatePickerDialog
          container='inline'
          mode='landscape'
          locale='en-US'
          cancelLabel='Закрыть'
          firstDayOfWeek={1}
          ref='dialog'
          autoOk={true}
          onAccept={this.handleAccept}
          initialDate={this.getDate()}
        />
      </div>
    )
  }
}
