import React, { PropTypes, Component } from 'react'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TextField from './MaskedTextField'
import Avatar from 'material-ui/Avatar'
import Calendar from 'material-ui/svg-icons/action/today'
class DateField extends Component {
  constructor(props) {
    super(props)
    const value = props.value || props.defaultValue
    this.state = {
      value: value,
      date: parseDate(value),
      error: ''
    }
  }

  _handleAccept = (date) => {
    this.setState({date})
  }

  _handleChange(e, value) {
    try {
      const date = parseDate(value)
      this.setState({date, error: ''})
    } catch (e) {
      this.setState({error: e.message})
    } finally {
      this.setState({value})
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
    const {value, date, error} = this.state

    return (
      <div
        className='c-field c-date-field'
        onKeyDown={this._handleKeyPress.bind(this)}
        >
        <TextField
          title={required ? title+' *' : title}
          required={required}
          name={name}
          mask='11.11.1111'
          pattern='\d{2,2}.\d{2,2}.\d{4,4}'
          value={ value }
          ref='input'
          onChange={this._handleChange.bind(this)}
          autoComplete={ false }
          errorText={error}
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
          cancelLabel='Закрыть'
          firstDayOfWeek={1}
          ref='dialog'
          autoOk={true}
          onAccept={ this._handleAccept }
          initialDate={ date || new Date() }
        />
      </div>
    )
  }
}

const parseDate = (value) => {
  if (!value || value.indexOf('_') > -1) return null
  const dateParts = value.split('.')
  const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
  //console.log('parseDate', value, date);
  if (date == 'Invalid Date') {
    throw new Error('Дата должна быть в формате дд.мм.гггг')
  }
  return date
}

DateField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool
}

export default DateField
