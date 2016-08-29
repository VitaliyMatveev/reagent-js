import React, { PropTypes } from 'react'
import './form-field.less'
export default function FormField(props){
  const { className, label:labelText,hint ,errorList, children:content } = props
  let label, hintText
  const hasError = errorList && errorList.length>0
  if(labelText){
    label = <label className='form-field__label'>{ labelText }</label>
  }
  if(hint || hasError){
    hintText = hasError ? errorList.map((error,i)=><li key={i}>{error}</li>): hint
  }
  return (
    <div className={ `form-field ${className || ''} ${hasError ? 'form-field_error' : ''} ${ !labelText ? 'form-field_without-label' : ''}` }>
      { content }
      { label }
      <ul className='form-field__hint'>{ hintText }</ul>
    </div>
  )
}

FormField.propTypes={
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  errorList: PropTypes.array,
  hint: PropTypes.string
}
