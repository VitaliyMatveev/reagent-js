import React from 'react'
import { equals } from 'ramda'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'

import CheckboxItems from './CheckboxItems.js'
import RadioItems from './RadioItems.js'
import Notification from './Notification.js'

// function isElementInViewport(container, el) {
//   var rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || container.clientHeight) &&
//     rect.right <= (window.innerWidth || container.clientWidth)
//   );
// }

const styles = {
  dialog: {
    padding: '0 24px',
  },
  itemListWithFilter: {
    maxHeight: 'inherit',
    display: 'flex',
    flexDirection: 'column'
  },
}

const SelectDialog = ({open, title, onClose, ...props}) => (
  <Dialog
    title={ title }
    open={ open }
    onRequestClose={onClose}
    bodyStyle={styles.dialog}
    >
    <ItemListWithFilter
      {...props}
    />
  </Dialog>
)

const ITEM_TYPE = {
  SELECT: 'select',
  RADIO: 'radio',
}

class ItemListWithFilter extends React.Component {
  static defaultProps = {
    type: ITEM_TYPE.SELECT
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.open != this.props.open ||
      !equals(nextProps.items, this.props.items) ||
      !equals(nextProps.selectedItems, this.props.selectedItems) ||
      !equals(nextProps.searchWords, this.props.searchWords)
  }

  getItems = () => this.props.items.slice(0, 30).map(item => ({
    ...item,
    checked: this.props.selectedItems.includes(String(item.id))
  }))

  render() {
    const { items, searchWords, onSearch, onCheck, type } = this.props
    const Component = type === ITEM_TYPE.RADIO ? RadioItems : CheckboxItems 
    return (
      <div style={styles.itemListWithFilter}>
        <TextField
          hintText='Поиск...'
          ref={ c => c && c.focus && c.focus() }
          value={searchWords}
          onChange={onSearch}
          fullWidth={true}
        />
        <Component 
          items={this.getItems()}
          onCheck={onCheck}
        />
        <Notification
          totalCount={this.props.totalCount}
          itemsCount={items.length}
        />
      </div>
    )
  }
}

export default SelectDialog
