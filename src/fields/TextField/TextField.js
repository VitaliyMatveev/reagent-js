import React from 'react'

import TextInput from './TextInput'
import MaskedTextInput from './MaskedTextInput'

import { maskedText } from '../../validators'
import formField from '../../decorators/formField'
import { TEXT_FIELD } from '../../constants'

const validate = (value, props) => {
  if (props.mask && maskedText(props.mask, value)) {
    return TEXT_FIELD.VALIDATE_MESSAGES.PATTERN_MISMATCH
  }
}

function TextField(props) {
  const { mask } = props
  if (mask) {
    return <MaskedTextInput { ...props } />
  }
  return <TextInput { ...props } />
}

export default formField({ validate })(TextField)
