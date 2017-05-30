import React, { PropTypes } from 'react'
import {List, ListItem} from 'material-ui/List'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class SelectedItemList extends React.PureComponent {
  shouldComponentUpdate(nextProps){
    return !nextProps.dialogOpen
  }

  render () {
    const { name, selectedItems, items, onClick } = this.props
    return (
      <div>
        <List>
          {
            selectedItems
              .map( id => items.find( item => item.id == id) )
              .map( ({ id, title, description }, index, arr) => (
                <ListItem
                  key={ id }
                  leftIcon= { <NavigationClose/> }
                  value={ id }
                  onClick={ () => onClick(id) }
                  primaryText={ `${title}${index == arr.length-1 ? '.' : ';'}` }
                  secondaryText={ description }
                />
              ))
          }
        </List>
        <select
          style={{display: 'none'}}
          name={`${name}[]`}
          multiple={true}
          value={selectedItems}
          >
          {
            selectedItems.map(id => (
              <option key={id} value={id}/>
            ))
          }
        </select>
      </div>
    )
  }
}

export default SelectedItemList;
