import React, { PropTypes, Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import FieldTitle from './FieldTitle'

class CheckboxField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      focused: false
    }
  }
  render () {
    const {title, items, name, value, required} = this.props
    const {focused} = this.state
    return (
      <div className='c-field'>
        <FieldTitle
          title={title}
          required={required}
          focused={focused}
        />
        {
          items.map(item => (
            <Checkbox
              key={item.id}
              name={name+'[]'}
              label={item.title}
              value={item.id}
              defaultChecked={value && [].concat(value).indexOf(item.title)>-1}
              onFocus={() => this.setState({focused: true})}
              onBlur={() => this.setState({focused: false})}
            />
          ))
        }
      </div>
    )
  }
}

export default CheckboxField
