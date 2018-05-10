import React, { Component } from 'react'
import { string, arrayOf, shape, oneOf } from 'prop-types'
import { Field } from 'react-final-form'

import ObjectInput from './ObjectInput'
import SelectInput from '../SelectField/SelectInput'

export default class OneOf extends Component {
  static propTypes = {
    keyField: string.isRequired,
    oneOf: arrayOf(
      shape({
        type: oneOf(['object']),
        properties: shape({}).isRequired,
      }).isRequired,
    ).isRequired,
    required: arrayOf(string),
  }

  getSelectItems = () => {
    const { oneOf, keyField } = this.props
    return oneOf.map(item => {
      if (keyField in item.properties) {
        const { title, value } = item.properties[keyField]
        return {
          id: value,
          title,
        }
      }
      throw new Error(`[OneOf][getSelectItems] Ключевое поле:${keyField} не найдено в свойствах oneOf`, item)
    })
  }

  getSelectTitle = () => this.props.oneOf[0].properties[this.props.keyField].title
  
  getSelectedItemProperties = value => {
    const { oneOf, keyField } = this.props
    const item = value ? oneOf.find(({ properties }) => 
      properties[keyField].value == value
    ) : oneOf[0]
    const properties = { ...item.properties }
    delete properties[keyField]
    return properties
  }

  renderSelectInput = props => {
    const { name, required } = this.props
    const { input: { value } } = props
    return (
      <div>
        <SelectInput 
          title={this.getSelectTitle()}
          items={this.getSelectItems()}
          {...props}
        />
        <ObjectInput
          name={name}
          properties={this.getSelectedItemProperties(value)}
          required={required}
        />
      </div>
    )
  }
  render() {
    const { keyField, name } = this.props
    
    return (
      <Field
        name={name ? `${name}.${keyField}` : keyField}
        render={this.renderSelectInput}
      />
    )
  }
}
