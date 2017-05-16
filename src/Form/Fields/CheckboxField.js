import React, { PropTypes, Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import FieldTitle from './FieldTitle'

class CheckboxField extends Component {
  constructor (props) {
    super (props)
    console.log('test');
    this.state = {
      focused: false,
      value: props.value || []
    }
  }
  static contextTypes = {
    onChange: PropTypes.func
  }

  _handleChange = (checked, item) => {
    const {value} = this.state
    this.setState({
      value: checked ?
        value.concat(item.id) : value.filter(el => el != item.id && el != item.title)
    }, () => {
      const {onChange} = this.context
      const {name} = this.props
      onChange && onChange({[name]: this.state.value})
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Checkbox', nextProps, this.props, nextState);
    return true
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
              onCheck={(e, checked) => this._handleChange(checked, item)}
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
