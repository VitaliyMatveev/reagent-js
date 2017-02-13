import React, { PropTypes, Component } from 'react'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TextField from './MaskedTextField'
import Avatar from 'material-ui/Avatar'
import Calendar from 'material-ui/svg-icons/action/today'
class DateField extends Component {
  constructor(props) {
    super(props)
    const {value, defaultValue} = props
    this.state = {
      value: value || defaultValue || ''
    }
  }

  _handleAccept(date) {
    this.setState({value: date.toLocaleDateString('ru')})
  }

  _handleChange(e, value) {
    console.log('test', value)
    //value && value[value.length - 1] != ' ' && this.setState({value: new Date(value)})
  }

  _parseDate(value) {
    if (value && value.length>0) {
      const today = new Date()
      let [
        day,
        month,
        year
      ] = value.split('.')
      day = day ? day : today.getDate()
      month = month ? month : today.getMonth()+1
      year = year ? year.length > 2 ? year : `20${year}` : today.getFullYear()
      return new Date(`${year}-${month}-${day}`)
    } else {
      return new Date()
    }
  }

  _showCalendar(){
    this.refs.dialog.show()
  }
  _hideCalendar() {
    this.refs.dialog.setState({open: false})
  }
  _handleKeyPress(e) {
    switch (e.keyCode) {
      case 32: {
        this._showCalendar()
        break
      }
      case 27: {
        this._hideCalendar()
        break
      }
      case 13: {
        this.refs.dialog.state.open && e.preventDefault()
      }
    }
  }
  render() {
    const {title, name, required} = this.props
    const {value} = this.state
    return (
      <div className='c-field c-date-field'>
        <TextField
          floatingLabelText={required ? title+' *' : title}
          required={required}
          name={name}

          mask='11.11-1111'
          ref='input'
          onKeyDown={this._handleKeyPress.bind(this)}
          onChange={this._handleChange.bind(this)}
          autoComplete={ false }
        />
        <Avatar
          size={32}
          className='c-date-field__button'
          onClick={this._showCalendar.bind(this)}
          icon={<Calendar/>}
        />
        <DatePickerDialog
          container='inline'
          mode='landscape'
          locale='en-US'
          firstDayOfWeek={1}
          ref='dialog'
          autoOk={true}
          onAccept={this._handleAccept.bind(this)}
          initialDate={this._parseDate(value)}
        />
      </div>
    )
  }
}

DateField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  defaultValue: PropTypes.bool,
  required: PropTypes.bool
}

export default DateField
