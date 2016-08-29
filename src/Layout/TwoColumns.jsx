import React, { PropTypes } from 'react'
import './layout.less'

const TwoColumns = ({leftColumnContent, rightColumnContent}) => {
  return (
    <div className='l-two-columns'>
      <aside className='l-two-columns__left-column'>
        {leftColumnContent}
      </aside>
      <aside className='l-two-columns__right-column'>
        {rightColumnContent}
      </aside>
    </div>
  )
}

export default TwoColumns

TwoColumns.propTypes={
  leftColumnContent: PropTypes.node.isRequired,
  rightColumnContent: PropTypes.node.isRequired
}
