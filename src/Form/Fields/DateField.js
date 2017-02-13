import React, { PropTypes, Component } from 'react'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TextField from './MaskedTextField'
import Avatar from 'material-ui/Avatar'
import Calendar from 'material-ui/svg-icons/action/today'
class DateField extends Component {
  constructor(props) {
    super(props)
    //console.log('test', parsedValue);
    const value = props.value || props.defaultValue

    this.state = {
      value: value ? parseDate(value) : null
    }
    console.log('constructor', this.state);
  }

  _handleAccept = (date) => {
    console.log('onAccept', date);
    this.setState({value: date})
  }

  _handleChange(e, str) {
    console.log('handleChange', str);
    const value = parseDate(str)
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
    console.log('Date', value);
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
          value={ value && value.toLocaleDateString('ru') }
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
          cancelLabel='Закрыть'
          firstDayOfWeek={1}
          ref='dialog'
          autoOk={true}
          onAccept={ this._handleAccept }
          initialDate={ value || new Date() }
        />
      </div>
    )
  }
}

const parseDate = (value) => {
  console.log('parseDate', value);
  const dateParts = value.split('.')
  return new Date(--dateParts[2], --dateParts[1], dateParts[0])
}

DateField.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool
}

export default DateField
