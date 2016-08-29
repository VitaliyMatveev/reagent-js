class ReestrSelectedFilter extends React.Component {
  render() {
    const { onClick, isActive, selectedItemsLength, title } = this.props
    if(selectedItemsLength > 0 || isActive) {
      return (
        <div className = { `selected-passports-filter ${ isActive ? "selected" : null }` }
          onClick = { onClick }
          title = { title || "Отображать только выбранные строки" }>
            <span>{ selectedItemsLength+"+" }</span>
        </div>
      )
    }
    return null;
  }
}

ReestrSelectedFilter.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  selectedItemsLength: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool,
  title: React.PropTypes.string
}
