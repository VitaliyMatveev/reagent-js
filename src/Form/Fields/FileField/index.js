import React, { Component, PropTypes } from 'react'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import './style.css'

export default class FileField extends Component{
  constructor (props){
    super (props)
    const { value, defaultValue } = props
    this.state={
      hasValue: value || defaultValue,
      focused: false,
      fileName: value || defaultValue || ''
    }
  }

  _handleChange(e){
    const { onChange } = this.props
    let { name: fileName } = e.target.files[0]
    console.log('change',e);
    this.setState({hasValue: true, fileName})
    onChange && onChange(e)
  }
  _handleClick(){
    const { hasValue } = this.state
    hasValue ? this._handleReset() : this.refs.input.click()
  }
  _handleReset (){
    this.setState({ hasValue: false, filename: null})
    this.refs.input.value=''
  }
  _handleFocus (){
    this.setState({focused: true})
  }
  _handleBlur (){
    this.setState({focused: false})
  }
  render(){
    const { required, label, name, title, defaultValue, value } = this.props
    const { muiTheme } = this.context
    const { primary1Color, secondaryTextColor } = muiTheme.palette
    const { hasValue, filename, focused } = this.state

    return (
      <div className='file-upload-widget'>
        <TextFieldLabel
          className={`file-upload-widget__label ${hasValue || focused ? 'file-upload-widget__label_focused' : ''}`}
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={hasValue == true || focused}
          style={{
            color: hasValue || focused ? primary1Color : secondaryTextColor
          }}
          >
          { title}
        </TextFieldLabel>
        <input
          type='text'
          className={`file-upload-widget__file-name ${hasValue || focused ? 'file-upload-widget__file-name_focused' : ''}`}
          readOnly={true}
          tabIndex={-1}
          value={filename || 'Выберите файл для загрузки'}
        />
        <FloatingActionButton
          className='file-upload-widget__button'
          mini={true}
          onClick={ this._handleClick.bind(this) }
          tabIndex={-1}
          >
          {
            hasValue ? <NavigationClose/> : <FileUpload/>
          }
        </FloatingActionButton>
        <input
          id={ name }
          name={ name }
          type='file'
          ref='input'
          required={ !!required }
          className='file-upload-widget__input'
          onFocus={ this._handleFocus.bind(this) }
          onBlur={ this._handleBlur.bind(this) }
          onChange={ this._handleChange.bind(this) }
        />
      </div>
    )
  }
}

FileField.propTypes={
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func
}

FileField.contextTypes = {
  muiTheme: PropTypes.object
}
