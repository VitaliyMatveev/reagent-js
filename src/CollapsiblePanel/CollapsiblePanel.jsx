import React, { Component, PropTypes } from 'react'
import './collapsible-panel.less'

export default class CollapsiblePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: props.showContent || false
    }
  }
  handleClick() {
    const showContent = this.state.showContent
    this.setState({ showContent: !showContent })
  }
  render() {
    const { title, titleClassName, className, content, iconClass } = this.props
    const { showContent } = this.state
    const icon = iconClass ? <i className={ iconClass } /> : null
    var contentPanel
    if(showContent){
      contentPanel = (
        <div className = 'collapsible-panel__content'>
          { content || 'нет данных' }
        </div>
      )
    }
    return (
      <div className = { `collapsible-panel ${className || ''} ${showContent ? 'open' : ''}` }>
        <div className = {`collapsible-panel__title ${titleClassName || ''}`} onClick = { this.handleClick.bind(this) }>
          { icon }
          { title }
          <div className='collapsible-panel__arrow' />
        </div>
        { contentPanel }
      </div>
    )
  }
}

CollapsiblePanel.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.node,
  showContent: PropTypes.bool,
  titleClassName: PropTypes.string,
  iconClass: PropTypes.string
}
