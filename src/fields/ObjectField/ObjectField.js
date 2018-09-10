import React, { Component } from 'react'
import { object, string } from 'prop-types'

import ObjectInput from './ObjectInput'
import OneOf from './OneOf'

import './style.less'

const compareObjeckPropsKeys = (nextProps, prevProps) => Object.keys(prevProps).filter(key => !(key in nextProps))

const getFieldsToRemove = (nextProps, prevProps) => {
  const unusedFieldList = compareObjeckPropsKeys(nextProps.properties, prevProps.properties)
  return unusedFieldList.map(fieldName => `${nextProps.name}.${fieldName}`)
}

export default class ObjectField extends Component {
  static propTypes = {
    properties: object,
    name: string,
    title: string,
  }

  static contextTypes = {
    reactFinalForm: object,
  }

  static defaultProps = {
    properties: {},
  }

  componentWillReceiveProps(nextProps) {
    const { removeFieldFromState } = this.context.reactFinalForm.mutators
    getFieldsToRemove(nextProps, this.props).forEach(
      name => removeFieldFromState(name)
    )
  }

  renderInput = () => this.props.oneOf ? (
    <OneOf
      {...this.props}
    />
  ) : (
    <ObjectInput {...this.props} />
  )

  render() {
    return (
      <div className='c-object-field'>
        <FieldTitle title={this.props.title}/>
        <div className='c-object-field__content'>
          { this.renderInput() }
        </div>
      </div>
    )
  }
}

const FieldTitle = ({title}) => (
  title ? <h4 className='c-object-field__title'>{title}</h4> : null
)
