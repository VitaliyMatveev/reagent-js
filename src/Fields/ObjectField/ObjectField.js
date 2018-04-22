import React, { PureComponent } from 'react'
import { object, string, arrayOf } from 'prop-types'

import renderField from '../renderField'

// import OneOf from '../OneOf'
import './style.less'

export default class ObjectField extends PureComponent {
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

  // static getValue = (elements, name, field) => {

  // // __getObjectFieldData__ ({properties}, elements, fullName) {
  //   //console.log('getObjectFieldData', properties, fullName);
  //   return Object.keys(properties).reduce((values, name) => {
  //     const value = this.__getFieldData___ (properties[name], name, elements, fullName)
  //     return {
  //       ...values,
  //       [name]: value
  //     }
  //   }, {})
  // }

  renderChildFields = () => {
    const { properties, name: parentName, value, required } = this.props
    return (
      <div>{Object.keys(properties).map(name => renderField({
      name,
      parentName,
      value: value[name],
      required: required.includes(name),
      field: properties[name],
      }))}</div>)
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
