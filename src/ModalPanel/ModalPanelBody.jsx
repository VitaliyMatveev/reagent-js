import React from 'react'
export default function ModalPanelBody({children}) {
  return (
    <div className = 'modal-panel__form__body'>
      { children || 'Не переданы элементы для отображения'}
    </div>
  )
}
