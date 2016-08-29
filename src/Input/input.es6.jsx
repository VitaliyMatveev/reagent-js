import React from 'react'

export function Input(props){
  const { className, hasError, onChange,onBlur, ...domProps } = props
  const onValueChange = (e) => {
    //onValidate(uid, validator.validate(validationRules, e.target.value))

    if(onChange){
      onChange(e.target.name, e.target.value)
    }
  }
  return <input
    placeholder=' '
    className={ `input ${className || ''} ${hasError ? 'input_error' : ''}` }
    { ...domProps }
    onChange={ onValueChange }
    onBlur={ (e) => { onBlur(e.target.name, e.target.value); onValueChange(e) } }
  />
}
