import React, { Component, PropTypes } from 'react'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import './style.less'

export default class FileField extends Component{
  constructor (props){
    super (props)
    const { value, defaultValue } = props
    const fieldValue = value || defaultValue || []
    this.state={
      hasValue: fieldValue.length > 0,
      focused: false,
      filename: fieldValue.length > 0 ? fieldValue[0].filename : ''
    }
  }

  componentDidMount () {
    this._validation()
  }

  _handleChange(e){
    const { onChange } = this.props
    let { name: filename } = e.target.files[0]
    this.setState({hasValue: true, filename})
    onChange && onChange(e)
  }

  _validation = () => {
    const { hasValue } = this.state
    const { required } = this.props
    const { filename } = this.refs
    if ( required && !hasValue ) {
      filename.setCustomValidity('Загрузите файл')
    } else {
      filename.setCustomValidity('')
    }
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
    this.setState({focused: false}, this._validation)
  }

  render(){
    const { required, name, title } = this.props
    const { muiTheme } = this.context
    const { primary1Color, secondaryTextColor } = muiTheme.palette
    const { hasValue, filename, focused } = this.state

    return (
      <div
        className='file-upload-widget'
        title={ title }
        >
        <TextFieldLabel
          className={`file-upload-widget__label ${hasValue || focused ? 'file-upload-widget__label_focused' : ''}`}
          muiTheme={ muiTheme }
          htmlFor={ name }
          shrink={ hasValue == true || focused }
          style={{
            color: hasValue || focused ? primary1Color : secondaryTextColor
          }}
          >
          { title ? required ? title + ' *' : title : null }
        </TextFieldLabel>
        <input
          type='text'
          className={ `file-upload-widget__file-name ${hasValue || focused ? 'file-upload-widget__file-name_focused' : ''}` }
          tabIndex={ -1 }
          ref='filename'
          value={ filename || 'Выберите файл для загрузки' }
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
  value: PropTypes.arrayOf( PropTypes.shape({
    filename: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    last_modified: PropTypes.number.isRequired,
    mime_type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  })),
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func
}

FileField.contextTypes = {
  muiTheme: PropTypes.object
}
