import React, { PropTypes } from 'react'
import './form-field.less'

export default function FormField(props){
  const { labelText, children:content } = props
  return (
    <div className='form-field'>
      <label className='form-field__label'>{ labelText }</label>
      <div className='form-field__content'>{ content }</div>
    </div>
  )
}

FormField.propTypes={
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
