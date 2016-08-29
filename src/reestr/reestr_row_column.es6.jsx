class ReestrRowColumn extends React.Component {
  render(){
    return (
      <div className = "reestr__column">
        { this.props.children }
      </div>
    )
  }
}

ReestrRowColumn.propTypes = {
  children: React.PropTypes.func.isRequired
}
