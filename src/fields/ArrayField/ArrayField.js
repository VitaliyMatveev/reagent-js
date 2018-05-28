import React, { PropTypes, Component } from 'react'

import { FieldArray } from 'react-final-form-arrays'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add'

import ArrayFieldItem from './ArrayFieldItem'
import './array_field.less'

class ArrayField extends Component {
  handleAdd = fields => {
    const { type } = this.props.items
    fields.push(type === 'object' ? {} : null)
  }

  renderItem = (name, index, fields) => (
    <ArrayFieldItem
      key={index}
      index={index}
      name={name}
      fields={fields}
      items={this.props.items}
    />            
  )

  renderContent = ({ fields, direction, title }) => (
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

  render() {
    return (
      <FieldArray 
        {...this.props}
        component={this.renderContent}
      />
    )
  }
}

ArrayField.propTypes = {
  items: PropTypes.object.isRequired,
  name: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.array
}

export default ArrayField
