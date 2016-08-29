import React, { PropTypes } from 'react'

import Plate  from '../Plate/Plate.jsx'

import './card.css'

export default function Card(props){
  const { title, picture, className, onClick } = props
  return (
    <Plate>
      <div className={ `card ${ className || '' }` } onClick={ onClick }>
        <img src={ picture } className='card__picture' title={ title } />
        <div className='card__title'>
          { title }
        </div>
      </div>
    </Plate>
  )
}

Card.propTypes={
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}
