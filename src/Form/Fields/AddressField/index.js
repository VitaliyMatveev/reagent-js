import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'

import AddressDialog from './AddressDialog'

function formatAddressString(address={}) {
  const appendStringToAddress = (addrStr, string, prefix) => {
    if (string) {
      return `${addrStr}${addrStr ? ', ' : ''}${prefix || ''}${string}`
    } else {
      return addrStr
    }
  }
  return Object.keys(address).reduce((addrStr, key) => (
    appendStringToAddress(addrStr, address[key])
  ), '')
}

class AddressField extends Component {
  constructor (props) {
    super (props)
    const { value } = props
    this.state={
      value,
      open: false,
      address: formatAddressString(value)
    }
  }
  _handleOpen (){
    this.setState({open: true})
  }
  _handleClose (){
    this.setState({open: false})
  }
  _handleSubmit (e){
    e.preventDefault()
    const value = Object.keys(addressPartitionals).reduce((result, name) => {
      const { value } = e.target.elements.namedItem(name)
      value ? result[name] = value : null
      return result
    },{})
    this.setState({address: formatAddressString(value), value, open: false})
    Object.keys(addressPartitionals).map(name => {
      const { value } = e.target.elements.namedItem(name)
      this.refs[name].value = value
    })
  }
  _handleKeyUp(e) {
    e.keyCode == 32 && this._handleOpen()
  }
  _handlePopupKeyUp (e){
    e.keyCode==27 && this._handleClose()
  }
  render () {
    const {title, name, required} = this.props
    const { open, address, value } = this.state
    return (
      <div className='c-field c-address-field'>
        <TextField
          className='c-address-field__input'
          onKeyUp={this._handleKeyUp.bind(this)}
          floatingLabelText={ required ? title+' *' : title }
          required={ required }
          fullWidth={true}
          ref='text_field'
          value={address || ''}
        />
        <FloatingActionButton
          mini={true}
          onClick={this._handleOpen.bind(this)}
          secondary={true}
          tabIndex={-1}
          >
          <SocialLocationCity/>
        </FloatingActionButton>
        <AddressDialog
          open={ open }
          title={ title }
          value={ value }
          addressPartitionals={ addressPartitionals }
          onClose={ this._handleClose.bind(this) }
          onSubmit={ this._handleSubmit.bind(this) }
          onKeyUp={ this._handlePopupKeyUp.bind(this) }
        />
        {
          Object.keys(addressPartitionals).map((addressName, i) => (
            <input
              key={i}
              type='hidden'
              ref={ addressName }
              name={ `${name}[${addressName}]` }
            />
          ))
        }
      </div>
    )
  }
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
export default AddressField
