import React, { PropTypes } from 'react'
import './plate.css'

export default function Plate({ className, onClick, children }){
  return (
    <div className={ `plate ${className || ''}`} onClick={onClick}>
      { children }
    </div>
  )
}

Plate.propTypes={
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}
