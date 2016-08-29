class ReestrBody extends React.Component {
  render(){
    const { children, height } = this.props
    if(React.Children.count(children) == 0){
      return (
        <div className = "reestr__body">
          <ReestrNotification text = "Справочник пуст." />
        </div>
      )
    }
    return (
      <div className = "reestr__body" style = {{ height: height, overflowY: "scroll" }}>
        { children }
      </div>
    )
  }
}

ReestrBody.propTypes = {
  height: React.PropTypes.number.isRequired
}
