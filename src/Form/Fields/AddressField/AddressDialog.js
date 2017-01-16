import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const AddressDialog = ({onClose, onSubmit, onKeyUp, open, title, addressPartitionals, value }) => (
  <Dialog
    open={open}
    modal={false}
    onRequestClose={ onClose }
    bodyStyle={{
      padding: 0
    }}
    >
    <form
      onSubmit={ onSubmit }
      onKeyUp={ onKeyUp }
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
                    defaultValue={value && value[name] || ''}
                    maxLength={i==0 ? 6 : 200}
                    fullWidth={true}
                  />
                </td>
              </tr>
            ))
          }
          <tr>
            <td className='c-address-field-popup__label'></td>
            <td className='c-address-field-popup__controls'>
              <FlatButton type='button' label='Отмена' onClick={ onClose }/>
              <FlatButton type='submit' label='Сохранить' primary={true}/>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </Dialog>
)

export default AddressDialog
