import React, { PropTypes, Component } from 'react'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import MaskedInput from 'react-maskedinput'

class MaskedTextField extends Component {
  constructor(props) {
    super(props)
    const {value, defaultValue} = props
    this.state = {
      focused: false,
      hasValue: defaultValue || value
    }
  }
  handleFocus() {
    this.setState({focused: true})
  }
  handleBlur() {
    this.setState({focused: false})
  }
  handleChange(event) {
    const {value} = event.target
    this.setState({hasValue: value && value != ''})
  }
  render () {
    const {name, mask, title, value, defaultValue} = this.props
    const {focused, hasValue} = this.state
    const {muiTheme} = this.context
    const {primary1Color, secondaryTextColor} = muiTheme.palette
    return (
      <div className='c-text-field'>
        <TextFieldLabel
          className='c-text-field__label'
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={focused || hasValue}
          style={{
            color: focused ? primary1Color : secondaryTextColor
          }}
          >
          {title}
        </TextFieldLabel>
        <MaskedInput
          ref='input'
          className='c-text-field__input'
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          id={name}
          mask={mask}
          name={name}
          value={value || defaultValue}
          placeholder={focused ? '' : ' '}
        />
        <TextFieldUnderline
          muiTheme={muiTheme}
          focus={focused}
        />
      </div>
    )
  }
}

MaskedTextField.contextTypes = {
  muiTheme: PropTypes.object
}
export default MaskedTextField;
