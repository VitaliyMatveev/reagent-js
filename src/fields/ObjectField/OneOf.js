import React, { Component } from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { Field } from 'react-final-form'

import ObjectInput from './ObjectInput'
import SelectInput from '../SelectField/SelectInput'

export default class OneOf extends Component {
  static propTypes = {
    oneOfFieldName: string.isRequired,
    oneOfFieldTitle: string.isRequired,
    oneOf: arrayOf(
      shape({
        type: 'object',
        id: string.isRequired,
        title: string.isRequired,
        properties: shape({}).isRequired,
      }).isRequired,
    ).isRequired,
    required: arrayOf(string),
  }

  getSelectItems = () => this.props.oneOf.map(({ id, title }) => ({
    id,
    title,
  }))
  
  getSelectedItemProperties = value => this.props.oneOf.find(
    ({ id }) => id == value
  ).properties

  renderSelectInput = props => {
    const { name, oneOfFieldTitle, required } = this.props
    const { input: { value } } = props
    return (
      <div>
        <SelectInput 
          title={oneOfFieldTitle}
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

  format = value => value || this.props.oneOf[0].id
  render() {
    const { oneOfFieldName, name } = this.props
    
    return (
      <Field
        name={name ? `${name}.${oneOfFieldName}` : oneOfFieldName}
        format={this.format}
        render={this.renderSelectInput}
      />
    )
  }
}
