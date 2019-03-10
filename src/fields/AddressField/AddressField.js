import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'
import AddressDialog from './AddressDialog'
import formField from '../../decorators/formField';
import { REQUIRED } from '../../constants';

const KEY_CODE = {
  ESC: 27,
  SPACE: 32,
}

const addressPartitionals = {
  zip: 'Индекс',
  region: 'Регион',
  sub_region: 'Район',
  city: 'Город',
  settlement: 'Населенный пункт',
  street: 'Улица',
  house: 'Дом',
  building: 'Строение',
  appartment: 'Помещение'
}

const validate = (value, {required}) => {
  if (required && (!value || Object.keys(value).length === 0)) {
    return REQUIRED
  }
  return null
}

class AddressInput extends Component {
  constructor (props) {
    super (props)
    this.state={
      open: false,
    }
  }

  handleOpen = () => this.setState({ open: true })
  
  handleClose = () => this.setState({ open: false }, () => this.refs.text_field.focus())

  getAddressObject = e => Object.keys(addressPartitionals).reduce(
    (result, name) => {
      const { value } = e.target.elements.namedItem(name)
      value ? result[name] = value : null
      return result
    }, {}
  )
  
  formatAddressString = address => {
    if (!address) return ''
    const appendStringToAddress = (addrStr, string, prefix) => {
      if (string) {
        return `${addrStr}${addrStr ? ', ' : ''}${prefix || ''}${string}`
      } else {
        return addrStr
      }
    }
    return Object.keys(addressPartitionals).reduce((addrStr, key) => (
      appendStringToAddress(addrStr, address[key])
    ), '')
  }

  handleKeyUp = e => e.keyCode === KEY_CODE.SPACE && this.handleOpen()

  handlePopupKeyUp = e => e.keyCode === KEY_CODE.ESC && this.handleClose()
  
  handleChange = onChange => e => {
    e.preventDefault()
    this.setState({ open: false })
    onChange(this.getAddressObject(e))
  }

  render() {
    const {
      title,
      input: {
        // name,
        value,
        onBlur,
        onChange,
      },
      meta: {
        error,
        touched,
      },
      required,
    } = this.props
    const { open } = this.state
    return (
      <div className='c-field c-address-field'>
        <TextField
          className='c-address-field__input'
          onKeyUp={this.handleKeyUp}
          onBlur={onBlur}
          floatingLabelText={title}
          required={required}
          fullWidth={true}
          errorText={touched && error}
          value={this.formatAddressString(value)}
        />
        <FloatingActionButton
          mini={true}
          onClick={this.handleOpen}
          secondary={true}
          tabIndex={-1}
          >
          <SocialLocationCity/>
        </FloatingActionButton>
        <AddressDialog
          open={open}
          title={title}
          value={value}
          addressPartitionals={addressPartitionals}
          onClose={this.handleClose}
          onSubmit={this.handleChange(onChange)}
          onKeyUp={this.handlePopupKeyUp}
        />
      </div>
    )
  }
}

export default formField({ validate })(AddressInput)
