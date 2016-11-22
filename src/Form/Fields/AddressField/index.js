import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'

import AddressDialog from './AddressDialog'

function formatAddressString(address) {
  const {
    zip,
    region,
    sub_region,
    city,
    settlement,
    street,
    house,
    building,
    appartment
  } = address
  let addrStr = zip ? `${zip}, ${region}` : region
  addrStr = sub_region ? `${addrStr}, ${sub_region}` : addrStr
  addrStr = city ? `${addrStr}, ${city}` : addrStr
  addrStr = settlement ? `${addrStr}, ${settlement}` : addrStr
  addrStr = street ? `${addrStr}, ${street}` : addrStr
  addrStr = house ? `${addrStr}, д.${house}` : addrStr
  addrStr = building ? `${addrStr}, корп.${building}` : addrStr
  addrStr = appartment ? `${addrStr}, кв.${appartment}` : addrStr
  return addrStr
}

class AddressField extends Component {
  constructor (props) {
    super (props)
    this.state={
      open: false,
      address: ''
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
    const values = Object.keys(addressPartitionals).reduce((result, name) => {
      const { value } = e.target.elements.namedItem(name)
      value ? result[name] = value : null
      return result
    },{})
    this.setState({address: formatAddressString(values), open: false})
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
    const {title, value, defaultValue, name, required} = this.props
    const { open, address } = this.state
    return (
      <div className='c-field c-address-field'>
        <TextField
          className='c-address-field__input'
          onKeyUp={this._handleKeyUp.bind(this)}
          floatingLabelText={ required ? title+' *' : title }
          required={ required }
          defaultValue={value || defaultValue}
          fullWidth={true}
          ref='text_field'
          value={address}
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
          addressPartitionals={ addressPartitionals }
          onClose={ this._handleClose.bind(this) }
          onSubmit={ this._handleSubmit.bind(this) }
          onKeyUp={ this._handlePopupKeyUp.bind(this) }
        />
        {
          // Object.keys(addressPartitionals).map((addressName, i) => (
          //   <input
          //     key={i}
          //     type='hidden'
          //     ref={ addressName }
          //     name={ `${name}[${addressName}]` }
          //   />
          // ))
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
