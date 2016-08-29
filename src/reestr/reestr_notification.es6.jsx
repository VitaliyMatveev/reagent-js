class ReestrNotification extends React.Component {
  render(){
    return (
      <div className = "reestr__notification"><span>{ this.props.text }</span></div>
    )
  }
}

ReestrNotification.propTypes = {
  text: React.PropTypes.string.isRequired
}
