import React, { PropTypes } from 'react'
import './panel.less'
export default function InlinePanel({ children }) {
  return (
    <div className='l-panel l-panel_inline'>
      {
        children.map( (el, i) =>
          <div key={i} className='l-panel__item'>{ el }</div>
        )
      }
    </div>
  )
}

InlinePanel.propTypes={
  children: PropTypes.array.isRequired
}
