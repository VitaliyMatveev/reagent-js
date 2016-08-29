import React, { PropTypes } from 'react'
import './button-group.css'

export default function ButtonGroup(props){
  return (
    <div className = { `button-group ${props.type || 'horisontal'}` }>
      { props.children }
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  type: PropTypes.oneOf(['vertical','horisontal'])
}
