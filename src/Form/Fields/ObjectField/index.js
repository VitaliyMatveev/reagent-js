import React, { PropTypes } from 'react'

import Field from '../Field'
import OneOf from '../OneOf'
import './style.css'

const ObjectField = (props) => {  
  const {properties, name, title, direction, value={}, required} = props
  let body
  if ('oneOf' in props) {
    const {oneOf, keyField} = props
    body = (
      <OneOf
        type='object'
        parentName={name}
        value={value}
        keyField={keyField}
        items={oneOf}
      />
    )
  } else {
    body = Object.keys (properties).map (fieldName => (
      <Field
        key={fieldName}
        parentName={name}
        name={fieldName}
        value={value[fieldName]}
        field={{
          ...properties[fieldName]
        }}
        required={required && required.indexOf(fieldName) > -1}
      />
    ))
  }
  return (
    <div className='c-object-field'>
      <FieldTitle title={title}/>
      { body }
    </div>
  )
}

const FieldTitle = ({title}) => (
  title ? <h4 className='c-object-field__title'>{title}</h4> : null
)
ObjectField.propTypes = {
  properties: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.array
}

export default ObjectField
