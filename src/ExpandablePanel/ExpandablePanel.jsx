import React, { Component, PropTypes } from 'react'
import './expandable-panel.less'
import icon from './ic_expand_more_black_24px.svg'
export default class ExpandablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.showContent || false
    }
  }
  handleClick() {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }
  render() {
    const { mainContent, expensionContent } = this.props
    const { expanded } = this.state
    let expansionPanel
    if(expanded){
      expansionPanel = (
        <div className='expandable-panel__expansion-panel'>
          { expensionContent }
        </div>
      )
    }
    return (
      <div className={ `expandable-panel ${expanded ? 'expandable-panel_open':''}` }>
        <div className='expandable-panel__main-panel' onClick = { this.handleClick.bind(this) }>
          { mainContent }
          <img src={ icon } className={ `expandable-panel__expand-icon ${expanded ? 'expandable-panel__expand-icon_less' : ''}` } />
        </div>
        { expansionPanel }
      </div>
    )
  }
}

ExpandablePanel.propTypes = {
  mainContent: PropTypes.node.isRequired,
  expensionContent: PropTypes.node.isRequired,
  expanded: PropTypes.bool
}
