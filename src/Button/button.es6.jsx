class Button extends React.Component {
  render(){
    const { value, title, onClick, type = "button", disabled } = this.props

    return (
      <input className="button-component" type={ type }
        title={ title }
        disabled={ disabled } value={ value } onClick={ onClick } />
    )
  }
}

Button.propTypes = {
  value: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  disabled: React.PropTypes.bool
}
