import React, { Component, PropTypes } from 'react'

import './tabs-panel.less'

export default class TabsPanel extends Component {
  constructor(props){
    super(props)
    this.state = {tabIndex: 0}
  }
  handleClick(index){
    this.setState({tabIndex: index})
  }
  render() {
    const { tabs, controls } = this.props
    const tabTitles = tabs.map((tab, index) => {
      let className = index == this.state.tabIndex ? 'active' : null
      return (
        <li key={ index } className = { className } onClick = { this.handleClick.bind(this, index) }>
          <a>{ tab.title }</a>
        </li>
      )
    })
    const tabContent = this.props.tabs[this.state.tabIndex].content
    return (
      <div className='tabs-panel scrollable'>
        <ul className='nav nav-tabs scrollable__header tabs-panel__navigator'>
          { tabTitles }{ controls }
        </ul>
        <div className='scrollable__body tabs-panel__content'>
          { tabContent }
        </div>
      </div>
    )
  }
}

TabsPanel.propTypes = {
  tabs: PropTypes.arrayOf( PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.node
  })).isRequired
}
