import React, { PropTypes } from 'react'

export default function CheckboxItem(props) {
  const { title, ...inputProps } = props
  return (
    <label className='selected-items__item'>
      <input type='checkbox' {...inputProps}/>
      { title }
    </label>
  )
}

CheckboxItem.propTypes={
  title: PropTypes.string.isRequired
}
