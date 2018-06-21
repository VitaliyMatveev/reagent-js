import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import TextFieldLabel from 'material-ui/TextField/TextFieldLabel'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import MaskedInput from 'react-maskedinput'

import FieldError from '../../components/FieldError'

export default class MaskedTextInput extends PureComponent {
  static contextTypes = {
    muiTheme: object,
  }

  render() {
    const { input, meta, title, mask, pattern } = this.props
    const { name, value, ...rest } = input
    const { error, touched, active } = meta
    const { muiTheme, muiTheme: { textField } } = this.context
    const { hintColor, focusColor } = textField

    const isErrored = Boolean(touched && error)

    return (
      <div className='c-text-field'>
        <TextFieldLabel
          className='c-text-field__label'
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={Boolean(active || value)}
          style={{
            color: active ? focusColor : hintColor
          }}
          >
          {title}
        </TextFieldLabel>
        <MaskedInput
          {...rest}
          className='c-text-field__input'
          id={name}
          mask={mask}
          name={name}
          pattern={pattern}
          value={value}
          placeholder={active ? '' : ' '}
          autoComplete={false}
        />
        <TextFieldUnderline
          muiTheme={muiTheme}
          focus={active}
          error={isErrored}
        />
        <FieldError
          muiTheme={muiTheme}
          text={isErrored && error}
        />
      </div>
    )
  }
}
