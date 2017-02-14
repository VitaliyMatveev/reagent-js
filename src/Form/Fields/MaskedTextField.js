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
      hasValue: !!(defaultValue || value)
    }
  }
  handleFocus() {
    this.setState({focused: true})
  }
  componentWillReceiveProps(nextProps) {
    const { value, defaultValue } = nextProps
    this.setState({hasValue: !!(defaultValue || value)})
  }
  handleBlur() {
    this.setState({focused: false})
  }
  handleChange(event) {
    const {value} = event.target
    const { onChange } = this.props
    this.setState({hasValue: value && value != ''}, () => {
      onChange && onChange(event, value)
    })
  }
  render () {
    const {name, mask, title, value, defaultValue, pattern, required, onKeyDown} = this.props
    const {focused, hasValue} = this.state
    const {muiTheme} = this.context
    const { hintColor, focusColor } = muiTheme.textField
    return (
      <div className='c-text-field'>
        <TextFieldLabel
          className='c-text-field__label'
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={focused || hasValue}
          style={{
            color: focused ? focusColor : hintColor
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
          onKeyDown={ onKeyDown }
          id={name}
          required={required}
          mask={mask}
          name={name}
          pattern={pattern}
          value={value || defaultValue}
          placeholder={focused ? '' : ' '}
          autoComplete={ false }
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
