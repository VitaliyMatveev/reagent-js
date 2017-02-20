import React, { PropTypes, Component } from 'react'

import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add'

import ArrayFieldItem from './ArrayFieldItem'
import './array_field.less'

class ArrayField extends Component {
  constructor (props) {
    super (props)

    this.state = {
      value: props.value || []
    }
  }

  _handleRemove (index){
    this.setState({ value: this.state.value.filter((el, i) => i != index) })
  }

  _handleAddComponents () {
    const {items, name, title, direction, required} = this.props
    this.setState({value: this.state.value.concat([null])})
  }

  render() {
    const {properties, name, title, direction, items, required} = this.props
    const {value=[]} = this.state
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
            onClick={() => this._handleAddComponents()}
            style={{marginRight: '0.25rem'}}
            >
            <AddIcon/>
          </FloatingActionButton>
        </div>
        {
          value.map((val, index) => (
            <ArrayFieldItem
              key={index}
              onSave={this._handleAddComponents.bind(this)}
              onRemove={ () => this._handleRemove(index)}
              items={items}
              name={`${name}[]`}
              required={required}
              value={val}
            />            
          ))
        }
      </div>
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
