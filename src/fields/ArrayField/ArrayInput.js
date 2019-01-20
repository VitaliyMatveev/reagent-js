import React, { PureComponent } from 'react'
import { shape, func, string, bool, number } from 'prop-types'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'

import ArrayFieldItem from './ArrayFieldItem'
import './array_field.less'
import FieldHint, { TYPE } from '../../components/FieldHint';
import { ARRAY_FIELD } from '../../constants'

export default class ArrayInput extends PureComponent {
  static propTypes = {
    fields: shape({
      push: func,
      map: func,
    }),
    name: string,
    direction: string,
    title: string,
    max: number,
    required: bool,
  }

  handleAdd = () => {
    const { items: { type }, fields, max } = this.props
    if (max && fields.length >= max) { return null }
    const value = type === 'object' ? {} : null
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
    const { fields, meta: { error, touched }, direction, title, max } = this.props
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
            disabled={max && fields.length >= max}
            style={{marginRight: '0.25rem'}}
            >
            <AddIcon/>
          </FloatingActionButton>
        </div>
        {error && touched && <FieldHint text={error} />}
        {!error && max && fields.length === max && <FieldHint text={ARRAY_FIELD.MAX_LIMIT_REACHED} type={TYPE.WARN} />}
        { fields.map(this.renderItem) }
      </div>
    )
  }
}
