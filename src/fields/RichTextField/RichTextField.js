import React from 'react'
import { Field } from 'react-final-form'

import RichTextInput from './RichTextInput'

export default props => (
  <Field
    {...props}
    component={RichTextInput}
  />
)
