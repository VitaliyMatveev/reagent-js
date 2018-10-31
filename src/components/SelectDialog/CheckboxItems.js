import React, { PureComponent } from 'react'
import Checkbox from 'material-ui/Checkbox'
import { ListItem } from 'material-ui/List'

const styles = {
  itemList: {
    overflow: 'auto'
  }
}

export default class CheckboxItems extends PureComponent {
  static defaultProps = {
    items: [],
  }

  renderCheckbox = (id, checked, onCheck) => onCheck && (
    <Checkbox
      value={id}
      checked={checked}
      onCheck={onCheck}
    />
  )

  renderItem = ({ id, title, description, checked }) => (
    <ListItem
      key={id}
      primaryText={title}
      secondaryText={description}
      leftCheckbox={this.renderCheckbox(id, checked, this.props.onCheck)}
    />
  )
  render() {
    const { items } = this.props
    return (
      <div style={styles.itemList}>
        { items.map(this.renderItem) }
      </div>
    )
  }
}
