import React, { PureComponent } from 'react'
import { func, arrayOf, shape, string, number } from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

export default class SelectedItemList extends PureComponent {
  static propTypes = {
    items: arrayOf(
      shape({
        id: number,
        title: string,
        description: string,
      }),
    ).isRequired,
    onClick: func.isRequired
  }

  shouldComponentUpdate(nextProps){
    return !nextProps.dialogOpen
  }
  handleClick = id => () => this.props.onClick(id)
  renderItem = (id, index, arr) => {
    const item = this.props.items.find(el => el.id == id)
    if (item) {
      const { title, description } = item
      return (
        <ListItem
          key={id}
          leftIcon= {<NavigationClose/>}
          onClick={this.handleClick(id)}
          primaryText={ `${title}${index == arr.length-1 ? '.' : ';'}` }
          secondaryText={description}
        />
      )
    }
    return null
  }

  render () {
    const { selectedItems } = this.props
    if (!selectedItems) { 
      return null
    }

    return (
      <List>
        {
          (
            Array.isArray(selectedItems) ?
            selectedItems :
            [selectedItems]
          ).map(this.renderItem)
        }
      </List>
    )
  }
}
