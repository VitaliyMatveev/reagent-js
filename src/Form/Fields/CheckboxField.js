import React, { PropTypes, Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import FieldTitle from './FieldTitle'

class CheckboxField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      focused: false,
      value: props.value || []
    }
  }
  static contextTypes = {
    onChange: PropTypes.func
  }

  _handleChange = (checked, id) => {
    const {value} = this.state
    this.setState({
      value: checked ?
        value.concat(id) : value.filter(el => el != id)
    }, () => {
      const {onChange} = this.context
      const {name} = this.props
      onChange && onChange({[name]: this.state.value})
    })
  }

  _handleFocus = () => this.setState({focused: true})

  _handleBlur = () => this.setState({focused: false})

  render () {
    const {title, items, name, required} = this.props
    const {focused, value} = this.state
    return (
      <div
        className='c-field'
        ref='field'
        >
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
              onCheck={(e, checked) => this._handleChange(checked, item.id)}
              checked={value.includes(item.id) || value.includes(item.title)}
              onFocus={this._handleFocus}
              onBlur={this._handleBlur}
            />
          ))
        }
      </div>
    )
  }
}

export default CheckboxField
