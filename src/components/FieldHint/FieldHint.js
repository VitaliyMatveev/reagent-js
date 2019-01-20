import React from 'react'
import * as PropTypes from 'prop-types'

export const TYPE = {
  ERROR: 'error',
  WARN: 'warn',
}

const TYPE_COLORS = {
  [TYPE.ERROR]: 'errorColor',
  [TYPE.WARN]: 'hintColor',
}

const hintStyles = (muiTheme, type) => ({
  color: muiTheme.textField[TYPE_COLORS[type]],
  margin: 0,
  marginTop: '6px'
})

const FieldHint = ({ text, type = TYPE.ERROR }, { muiTheme={} }) => {
  return (
    <p style={hintStyles(muiTheme, type)}>
      {text}
    </p>
  )
}

FieldHint.contextTypes = {
  muiTheme: PropTypes.object,
  type: PropTypes.oneOf(Object.values(TYPE))
}

export default FieldHint
