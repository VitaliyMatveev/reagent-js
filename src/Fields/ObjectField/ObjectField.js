import React, { Component } from 'react'
import { object, string, arrayOf } from 'prop-types'

import Field from '../Field'

// import OneOf from '../OneOf'
import './style.less'

export default class ObjectField extends Component {
  static propTypes = {
    properties: object,
    name: string,
    title: string,
    required: arrayOf(string),
  }

  static defaultProps = {
    required: [],
    value: {},
  }

  renderChildFields = () => {
    const { properties, name: parentName, required } = this.props
    return (
      <div>
        {
          Object.keys(properties).map(name => 
            <Field
              key={name}
              name={parentName ? `${parentName}.${name}` : name}
              // required={required.includes(name)}
              field={properties[name]}
            />
          )
        }
      </div>
    )
  }

  render() {
    const { title } = this.props
    
  // if ('oneOf' in props) {
  //   const {oneOf, keyField} = props
  //   body = (
  //     <OneOf
  //       type='object'
  //       parentName={name}
  //       value={value}
  //       keyField={keyField}
  //       items={oneOf}
  //     />
  //   )
  // } else {
    
    return (
      <div className='c-object-field'>
        <FieldTitle title={title}/>
        <div className='c-object-field__content'>
          { this.renderChildFields() }
        </div>
      </div>
    )
  }
}

const FieldTitle = ({title}) => (
  title ? <h4 className='c-object-field__title'>{title}</h4> : null
)
