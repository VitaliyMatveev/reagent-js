import React, { PropTypes } from 'react'
import './modal-panel.less'
export default function ModalPanel(props){
  const { title, children, onCloseBtnClk } = props
  return (
    <div className = 'modal-panel' onClick = { (e) => {console.log('close',e); onCloseBtnClk() } }>      
      <div className = 'modal-panel__form' >
        <div className = 'modal-panel__form__header' >
          <div>{ title }</div>
          <i
            className = 'icon-remove-sign'
            onClick = { onCloseBtnClk }
          />
        </div>
          { children }
      </div>
    </div>
  )
}

ModalPanel.propTypes = {
  title: PropTypes.string.isRequired,
  onCloseBtnClk: PropTypes.func.isRequired
}
