import React, { PureComponent } from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { Field } from 'react-final-form'

import ObjectInput from './ObjectInput'
import SelectInput from '../SelectField/SelectInput'

export default class OneOf extends PureComponent {
  static propTypes = {
    oneOfFieldName: string.isRequired,
    name: string,
  }

  render() {
    const { oneOfFieldName, name: fieldName } = this.props
    const name = fieldName ? `${fieldName}.${oneOfFieldName}` : oneOfFieldName
    return (
      <Field
        {...this.props}
        fieldName={fieldName}
        component={OneOfSelectInput}
        name={name}
      />
    )
  }
}

class OneOfSelectInput extends PureComponent { 
  static propTypes = {
    oneOfFieldName: string.isRequired,
    oneOfFieldTitle: string.isRequired,
    oneOf: arrayOf(
      shape({
        type: 'object',
        id: string.isRequired,
        title: string.isRequired,
        properties: shape({}).isRequired,
        required: arrayOf(string),
      })
    ).isRequired,
  }

  getSelectItems = () => this.props.oneOf.map(({ id, title }) => ({
    id,
    title,
  }))
  
  getSelectedItem = value => value && this.props.oneOf.find(
    ({ id }) => id == value
  )

  render() {
    const { fieldName, oneOfFieldTitle, ...rest } = this.props
    const { input: { value } } = rest
    const { properties, required } = this.getSelectedItem(value)
    return (
      <div>
        <SelectInput 
          {...rest}
          title={oneOfFieldTitle}
          items={this.getSelectItems()}
        />
        {
          properties && <ObjectInput
          name={fieldName}
          properties={properties}
          required={required}
        />}
      </div>
    )
  }
}
