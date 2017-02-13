import React, { PropTypes, Component } from 'react'
import {default as UUID} from 'node-uuid';

import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add'

import ArrayFieldItem from './ArrayFieldItem'

import './array_field.less'

class ArrayField extends Component {
  constructor (props) {
    super (props)

    this.state = {
      items: {}
    }
  }

  _handleRemoveComponent (index){
    let items = this.state.items;
    delete items[index]
    this.setState({ items: items })
  }

  _handleAddComponents () {
    const {items, name, title, direction, value={}, required} = this.props
    let uuid = UUID.v4();
    let components = this.state.items;
    components[uuid] = <ArrayFieldItem
                   key={UUID.v4()}
                   index={uuid}
                   handleRemoveComponent={this._handleRemoveComponent.bind(this)}
                   items={items.properties}
                   name={name}
                   title={title}
                   direction={direction}
                   value={value}
                   required={required} />

    this.setState({items: components})
  }

  render() {
    const {properties, name, title, direction, value={}, required} = this.props
    return (
      <div className={`c-dynamic-field${direction == 'horizontal' ? ' c-dynamic-field_horizontal' : ''}`}>
        { title ? <h4 className='c-object-field__title'>{title}</h4> : null }
        <RaisedButton
          key={`add-${UUID.v4()}`}
          type='button'
          icon={<AddIcon/>}
          primary={true}
          onClick={this._handleAddComponents.bind(this)}
          style={{marginRight: '0.25rem'}}
        />
        <div>
          {
            Object.values(this.state.items)
          }
        </div>
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
