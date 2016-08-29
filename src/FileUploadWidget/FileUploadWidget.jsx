import React, { Component, PropTypes } from 'react'

import { UploadButton } from '../Button/CircleButton.jsx'
import './file-upload-widget.less'

export default class FileUploadWidget extends Component{
  handleInputChange(e){
    const { onChange } = this.props
    let input = e.target
    this.refs.label.innerHTML = input.files[0].name
    if(onChange){
      onChange(e)
    }
  }
  handleUploadBtnClk(){    
    this.refs.input.click()
  }
  render(){
    const { required, label, name, title, fileName } = this.props
    // const id=Date.now()
    // return(
    //   <div className='file-upload-widget'>
    //     <input id={ id } name={ name } type='file' className='file-upload-widget__input'
    //       required={ !!required } { ...other } onChange={ onInputChange } />
    //     <label htmlFor={ id }
    //       className='file-upload-widget__label'
    //       data-file-name='Выберите файл для загрузки'
    //       >
    //       { label || 'Загрузить файл' }
    //     </label>
    //   </div>
    // )
    return (
      <div className='file-upload-widget' title={ title }>
        <input id={ name } name={ name } type='file' className='file-upload-widget__input'
          ref='input' required={ !!required } onChange={ this.handleInputChange.bind(this) }
          />
        <label htmlFor={ name }
          className='file-upload-widget__label'
          >
          <UploadButton onClick={ this.handleUploadBtnClk.bind(this) }/>
          <span className='file-upload-widget__file-name' ref='label'>
            { fileName || label}
          </span>
        </label>
      </div>
    )
  }
}

FileUploadWidget.propTypes={
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
}
