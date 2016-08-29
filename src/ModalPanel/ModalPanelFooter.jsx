import React from 'react'
export default function ModalPanelFooter({children}) {
  return (
    <div className = 'modal-panel__form__footer'>
      { children || 'Не переданы элементы для отображения'}
    </div>
  )
}
