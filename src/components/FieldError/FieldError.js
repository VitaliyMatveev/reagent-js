import React from 'react'

export default ({text, muiTheme}) => text ? (
  <div
    style={{
      color: muiTheme.textField.errorColor,
      fontSize: '12px',
      position: 'absolute',
      bottom: '-1rem',
      whiteSpace: 'nowrap'
    }}
    >
    { text }
  </div>
) : null