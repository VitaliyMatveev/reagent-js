import React, { PureComponent } from 'react'
import { shape, string, arrayOf } from 'prop-types'

import Field from '../Field'

export default class ObjectInput extends PureComponent {
  static propTypes = {
    properties: shape({}).isRequired,
    name: string,
    required: arrayOf(string),
  }

  static defaultProps = {
    required: [],
    properties: {},
  }

  render() {
    const { properties, name: parentName, required } = this.props
    return (
      <div>
        {
          Object.keys(properties).map(name => 
            <Field
              key={name}
              name={parentName ? `${parentName}.${name}` : name}
              required={required.includes(name)}
              field={properties[name]}
            />
          )
        }
      </div>
    )
  }
}