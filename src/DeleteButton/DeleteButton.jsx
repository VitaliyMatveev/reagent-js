import React from 'react'

import SubmitButton from '../SubmitButton/SubmitButton.jsx'

export default function DeleteButton(props){
  const initialClassName = 'btn-warning'
  const initialText = 'Удалить'
  const successText = 'Удалено'
  return(
    <SubmitButton { ...props}
      initialClassName={ initialClassName }
      initialText={ initialText }
      successText={ successText }
    />
  )
}
