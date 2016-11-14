import React, { PropTypes, Component } from 'react'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'

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
    e.preventDefault()
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
      <div>
        <TextField
          onKeyUp={this._handleKeyUp.bind(this)}
          floatingLabelText={required ? title+' *' : title}
          required={required}
          defaultValue={value || defaultValue}
          fullWidth={true}
          readOnly={true}
          ref='text_field'
          value={address}
          style={{
            maxWidth: 'calc(100% - 40px)'
          }}
        />
        <FloatingActionButton
          mini={true}
          onClick={this._handleOpen.bind(this)}
          secondary={true}
          tabIndex={-1}
          >
          <SocialLocationCity/>
        </FloatingActionButton>
        <Dialog
          open={open}
          modal={false}
          onRequestClose={ this._handleClose.bind(this) }
          bodyStyle={{
            padding: 0
          }}
          >
          <form
            onSubmit={this._handleSubmit.bind(this)}
            onKeyUp={this._handlePopupKeyUp.bind(this)}
            >
            <table
              className='c-address-field-popup'
              >
              <tbody>
                <tr>
                  <td className='c-address-field-popup__label'>
                  </td>
                  <td className='c-address-field-popup__title'>
                    {title}
                  </td>
                </tr>
                {
                  Object.keys(addressPartitionals).map((name, i) => (
                    <tr key={i}>
                      <td className='c-address-field-popup__label'>
                        <label htmlFor={name}>
                          { addressPartitionals[name] }
                        </label>
                      </td>
                      <td
                        className='c-address-field-popup__input'
                        >
                        <TextField
                          id={name}
                          name={name}
                          ref={c => i==0 && c && c.focus && c.focus()}
                          defaultValue={this.refs[name] && this.refs[name].value}
                          fullWidth={true}
                        />
                      </td>
                    </tr>
                  ))
                }
                <tr>
                  <td className='c-address-field-popup__label'></td>
                  <td className='c-address-field-popup__controls'>
                    <FlatButton type='button' label='Отмена' onClick={this._handleClose.bind(this)}/>
                    <FlatButton type='submit' label='Сохранить' primary={true}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Dialog>
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
