class Reestr extends React.Component {
  getChildContext() {
    return { selectable: this.props.selectable }
  }
  render() {
    return (
      <div className = "reestr-component">
        { this.props.children }
      </div>
    )
  }
}

Reestr.childContextTypes = {
  selectable: React.PropTypes.bool
}
