import React, {PropTypes} from 'react'

const hintStyles = muiTheme => ({
  color: muiTheme.textField.errorColor,
  margin: 0,
  marginTop: '6px'
})

const FieldHint = ({ text }, { muiTheme={} }) => {
  return (
    <p style={hintStyles(muiTheme)}>
      {text}
    </p>
  )
}

FieldHint.contextTypes = {
  muiTheme: PropTypes.object
}

export default FieldHint
