import React, { PropTypes, Component } from 'react'
import Checkbox from 'material-ui/Checkbox'

class BooleanField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      focused: false
    }
  }
  render () {
    const {title ,label, value, defaultValue, name, required} = this.props
    const {focused} = this.state
    return (
      <div className={`c-field ${focused ? 'c-field_focused' : ''}`}>
        {title ? <label className='c-field__label'>{title}</label> : null}
        <Checkbox
          key={`bool-field-${name}`}
          name={name}
          label={label}
          defaultChecked={ value }
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})}
        />
      </div>
    )
  }
}

export default BooleanField
