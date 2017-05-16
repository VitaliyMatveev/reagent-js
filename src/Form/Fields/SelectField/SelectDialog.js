import React, { PropTypes } from 'react'
import { equals } from 'ramda'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {List, ListItem} from 'material-ui/List'

import { getText } from '../../utils.js'

function isElementInViewport(container, el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || container.clientHeight) &&
    rect.right <= (window.innerWidth || container.clientWidth)
  );
}

const SelectDialog = ({open, title, onClose, ...props}) => (
  <Dialog
    title={ title }
    open={ open }
    onRequestClose={onClose}
    bodyStyle={{padding: '0 24px'}}
    >
    <ItemListWithFilter
      {...props}
    />
  </Dialog>
)

class ItemListWithFilter extends React.Component {
  static contextTypes = {
    MultiSelectField: PropTypes.shape({
      searchFieldHintText: PropTypes.string
    })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.open != this.props.open ||
      !equals(nextProps.items, this.props.items) ||
      !equals(nextProps.selectedItems, this.props.selectedItems) ||
      !equals(nextProps.searchWords, this.props.searchWords)
  }

  render() {
    const {title, open, items, selectedItems, searchWords, onClose, onSearch, onCheck} = this.props
    const format = getText.bind(null, { searchFieldHintText: 'Поиск...'}, this.context.MultiSelectField || {})
    return (
      <div style={{
          maxHeight: 'inherit',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <TextField
          hintText={ format('searchFieldHintText') }
          ref={ c => c && c.focus && c.focus() }
          value={searchWords}
          onChange={onSearch}
          fullWidth={true}
        />
        <div style={{
          overflow: 'auto'
          }}
          ref='itemList'
          >
          {
            items.concat([]).splice(0, 30).map(item => (
              <DictionaryItem
                key={item.id}
                { ...item }
                checked={ selectedItems.includes(item.id+'') }
                onCheck={ onCheck }
              />
          ))
          }
        </div>
        <Notification
          totalCount={this.props.totalCount}
          itemsCount={items.length}
        />
      </div>
    )
  }
}

const Notification = ({totalCount, itemsCount}, {MultiSelectField={}}) => {
  const defaultText = {
    emptyText: 'По заданному фильтру, ничего не найдено',
    hasMoreText: 'Показаные первые {1} элементов из {2}',
    foundedText: 'Найдено {1} элементов'
  }
  const format = getText.bind(null, defaultText, MultiSelectField)
  if (itemsCount == 0) {
    return (
      <ListItem key='has_more'
        secondaryText={ format('emptyText') }
        disabled={true}
      />
    )
  } else if (itemsCount > 30) {
    return (
      <ListItem key='has_more'
        secondaryText={ format('hasMoreText', 30, itemsCount) }
        disabled={true}
      />
    )
  } else {
    return (
      <ListItem key='has_more'
        secondaryText={ format('foundedText', itemsCount) }
        disabled={true}
      />
    )
  }
}

Notification.contextTypes = {
  MultiSelectField: PropTypes.shape({
    emptyText: PropTypes.string,
    hasMoreText: PropTypes.string,
    foundedText: PropTypes.string
  })
};

const DictionaryItem = ({id, title, description, checked, onCheck}) => (
  <ListItem
    key={id}
    primaryText={ title }
    secondaryText={ description }
    leftCheckbox={
      onCheck ?
        <Checkbox
          value={ id }
          checked={ checked }
          onCheck={ onCheck }
        />
      : null
    }
  />
)

export default SelectDialog
