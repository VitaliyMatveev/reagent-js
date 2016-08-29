class ReestrColumn extends React.Component {
  render(){
    return (
      <div className = "reestr__column">
        { this.props.children }
      </div>
    )
  }
}

ReestrColumn.propTypes = {
  children: React.PropTypes.node.isRequired
}
