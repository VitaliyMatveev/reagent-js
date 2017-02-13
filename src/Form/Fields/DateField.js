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
      value: value || defaultValue || new Date()
    }
  }

  _handleAccept(date) {
    this.setState({value: date.toLocaleDateString('ru')})
  }

  _handleChange(e, str) {
    const value = new Date(str)
    value != 'Invalid Date' && this.setState({value})
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
      <div
        className='c-field c-date-field'
        onKeyDown={this._handleKeyPress.bind(this)}
        >
        <TextField
          floatingLabelText={required ? title+' *' : title}
          required={required}
          name={name}
          mask='11.11.1111'
          pattern='\d{2,2}.\d{2,2}.\d{4,4}'
          ref='input'
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
          initialDate={ value }
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
