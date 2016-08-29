import React from 'react'

import Tag from '../../Tag/Tag.jsx'
import './search-word.css'
export default function SearchWord(props){
  return (
    <span className='search-word' title='Нажмите чтобы удалить'>
      <Tag {...props}/>
    </span>
  )
}
