import React, { Component } from 'react'
import { object } from 'prop-types'
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import MaskedInput from 'react-maskedinput'

export default class MaskedTextField extends Component {
  static contextTypes = {
    muiTheme: object,
  }

  render () {
    const {name, mask, title, value, pattern, onChange, required, focused, error } = this.props
    const {muiTheme} = this.context
    const { hintColor, focusColor, errorColor } = muiTheme.textField
    return (
      <div className='c-text-field'>
        <TextFieldLabel
          className='c-text-field__label'
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={focused || value}
          style={{
            color: error ? errorColor : focused ? focusColor : hintColor
          }}
          >
          {title}
        </TextFieldLabel>
        <MaskedInput
          ref='input'
          className='c-text-field__input'
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={onChange}
          id={name}
          required={required}
          mask={mask}
          name={name}
          pattern={pattern}
          value={value}
          placeholder={focused ? '' : ' '}
          autoComplete={ false }
        />
        <TextFieldUnderline
          muiTheme={muiTheme}
          focus={focused}
          error={Boolean(error)}
        />
        <ErrorText
          muiTheme={muiTheme}
          errorText={error}
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
