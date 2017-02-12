import React, {PropTypes} from 'react'

const FieldTitle = ({ title, required, focused }, { muiTheme={} }) => {
  const { hintColor, focusColor } = muiTheme.textField
  if (title) {
    return (
      <label
        className='c-field__label'
        style={{
          color: focused ? focusColor : hintColor
        }}
        >
        { `${title}${required ? ' *' : ''}` }
      </label>
    )
  } else {
    return null
  }
}

FieldTitle.contextTypes = {
  muiTheme: PropTypes.object
}

export default FieldTitle
