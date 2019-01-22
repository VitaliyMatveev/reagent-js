import React, { Component } from 'react'
import { object, string } from 'prop-types'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import FieldError from '../../components/FieldError'

import './style.less'

export default class FileInput extends Component{
  static contextTypes = {
    muiTheme: object,
  }

  static propsTypes = {
    accept: string,
  }

  static defaultProps = {
    accept: null,
  }

  handleClick = () => {
    const { value, onChange } = this.props.input
    return value ? onChange('') : this.refs.input.click()
  }

  handleChange = ({ target: { files }}) => {
    this.props.input.onChange(files.length ? files : '');
  }

  render() {
    const {
      accept,
      input,
      input: { name, active, value, onBlur, onFocus },
      title,
      meta: { touched, error },
      required,
    } = this.props
    const { muiTheme, muiTheme: { palette: { primary1Color, secondaryTextColor } } } = this.context

    const file = value && value[0];
    const showTitle = active || file;
    const filenameTitle = file && (file.name || file.filename) || 'Выберите файл для загрузки';

    return (
      <div
        className='file-upload-widget'
        title={title}
        tabIndex={1}
        onFocus={onFocus}
        onBlur={onBlur}
        >
        <TextFieldLabel
          className={`file-upload-widget__label ${showTitle ? 'file-upload-widget__label_focused' : ''}`}
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={showTitle}
          style={{ color: showTitle ? primary1Color : secondaryTextColor }}
          >
          { title ? required ? title + ' *' : title : null }
        </TextFieldLabel>
        <input
          type='text'
          className={`file-upload-widget__file-name ${showTitle ? 'file-upload-widget__file-name_focused' : ''}`}
          tabIndex={-1}
          ref='filename'
          value={filenameTitle}
        />
        <FieldError
            text={touched && error}
            muiTheme={muiTheme}
            style={{
              paddingLeft: '3.25rem',
            }}
          />
        <FloatingActionButton
          className='file-upload-widget__button'
          mini={true}
          onClick={this.handleClick}
          tabIndex={-1}
          backgroundColor={touched && error ? 'red' : undefined}
          >
          {
            value ? <NavigationClose/> : <FileUpload />
          }
        </FloatingActionButton>
        <input
          accept={accept}
          id={ name }
          name={ name }
          type='file'
          ref='input'
          className='file-upload-widget__input'
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
