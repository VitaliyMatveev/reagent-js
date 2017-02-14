import React, { PropTypes, Component } from 'react'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import MaskedInput from 'react-maskedinput'
import { findDOMNode } from 'react-dom'

class MaskedTextField extends Component {
  constructor(props) {
    super(props)
    const {value, errorText, defaultValue} = props
    this.state = {
      focused: false,
      errorText,
      hasValue: !!(defaultValue || value)
    }
  }
  handleFocus() {
    this.setState({focused: true})
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({hasValue: !!nextProps.value})
    }
    if ('errorText' in nextProps) {
      this.setState({errorText: nextProps.errorText})
    }
  }
  handleBlur() {
    const el = findDOMNode(this.refs.input)
    const { errorText } = this.props
    this.setState({focused: false, errorText: errorText || el.validationMessage})
  }
  handleChange(event) {
    const {value} = event.target
    const { onChange } = this.props
    this.setState({hasValue: value && value != ''}, () => {
      onChange && onChange(event, value)
    })
  }
  render () {
    const {name, mask, title, value, defaultValue, pattern, required} = this.props
    const {focused, hasValue, errorText} = this.state
    const {muiTheme} = this.context
    const { hintColor, focusColor, errorColor } = muiTheme.textField
    return (
      <div className='c-text-field'>
        <TextFieldLabel
          className='c-text-field__label'
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={focused || hasValue}
          style={{
            color: errorText ? errorColor : focused ? focusColor : hintColor
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
          error={!!errorText}
        />
        <ErrorText
          muiTheme={muiTheme}
          errorText={errorText}
        />
      </div>
    )
  }
}

const ErrorText = ({errorText, muiTheme}) => errorText ? (
  <div
    style={{
      color: muiTheme.textField.errorColor,
      fontSize: '12px',
      position: 'absolute',
      bottom: '-1rem',
      whiteSpace: 'nowrap'
    }}
    >
    { errorText }
  </div>
) : null

MaskedTextField.contextTypes = {
  muiTheme: PropTypes.object
}
export default MaskedTextField;
