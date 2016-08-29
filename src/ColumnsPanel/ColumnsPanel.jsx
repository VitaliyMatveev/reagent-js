import React, { PropTypes } from 'react'

import './columns-panel.less'

export default function ColumnsPanel({columns}){
  const content = columns.map( (column, i) =>
    <div key={ i } className='columns-panel__item'>
      { column }
    </div>
  )
  return (
    <div className='columns-panel'>
      { content }
    </div>
  )
}

ColumnsPanel.propTypes={
  columns: PropTypes.array.isRequired
}
