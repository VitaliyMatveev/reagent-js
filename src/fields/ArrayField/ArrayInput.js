import React, { PureComponent } from 'react'
import { shape, func, string, bool } from 'prop-types'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'

import ArrayFieldItem from './ArrayFieldItem'
import './array_field.less'

export default class ArrayInput extends PureComponent {
  static propTypes = {
    fields: shape({
      push: func,
      map: func,
    }),
    name: string,
    direction: string,
    title: string,
    required: bool,
  }

  handleAdd = () => {
    const { items: { type }, fields } = this.props
    const value = type === 'object' ? {} : ''
    fields.push(value)
  }

  handleDelete = index => this.props.fields.remove(index)

  renderItem = (name, index) => (
    <ArrayFieldItem
      key={name}
      index={index}
      name={name}
      onDelete={this.handleDelete}
      items={this.props.items}
    />            
  )

  render() {
    const { fields, direction, title } = this.props
    return (
      <div className={`c-dynamic-field${direction == 'horizontal' ? ' c-dynamic-field_horizontal' : ''}`}>
        <div style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}>
          <h4 className='c-array-field__title'>
            {title}
          </h4>
          <FloatingActionButton
            secondary={true}
            mini={true}
            onClick={this.handleAdd}
            style={{marginRight: '0.25rem'}}
            >
            <AddIcon/>
          </FloatingActionButton>
        </div>
        { fields.map(this.renderItem) }
      </div>
    )
  }
}
