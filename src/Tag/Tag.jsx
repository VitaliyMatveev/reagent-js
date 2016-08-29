import React, { PropTypes } from 'react'

import './tag.css'

export default function Tag(props){
  return (
    <span className='tag' onClick={ props.onClick }>{ props.text }</span>
  )
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
