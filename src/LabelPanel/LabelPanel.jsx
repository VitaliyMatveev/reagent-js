import React, { Component, PropTypes } from 'react'

import './label-panel.less'

export default class LabelPanel extends Component {
  render() {
    const data = this.props.data,
      content = Object.keys(data).map((key) => {
        return (
          <li key={ key } className='label-panel'>
            <div className='label-panel__title'>{ key }</div>
            <div className='label-panel__content'>{ data[key] }</div>
          </li>
        )
      })
    return (
      <ul>
        { content }
      </ul>
    )
  }
}

LabelPanel.propTypes = {
  data: PropTypes.object.isRequired
}
