class ReestrRow extends React.Component {
  render(){
    const { selected, index, onSelect, children } = this.props
    let firstColumn, subRowPanel
    const selectable = this.context.selectable
    if(selectable ){
      checkBox = (
        <div>
          <input type="checkbox"
            onChange = { onSelect.bind(null, rowId) }
            defaultValue = { false }
            checked = { selected }
          />
        </div>
      )
    } else {
      firstColumn = <ReestrColumn key = "index">{ index+1 }</ReestrColumn>
    }
    return (
      <div className = "reestr__row">
        { firstColumn }
        { children }
      </div>
    )
  }
}

ReestrRow.propTypes = {
  shildren: React.PropTypes.arrayOf(ReestrColumn),
  index: React.PropTypes.number.isRequired,
  onSelect: React.PropTypes.func
}

ReestrRow.contextTypes = {
  selectable: React.PropTypes.bool
}
