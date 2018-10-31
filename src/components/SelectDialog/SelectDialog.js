import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
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
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    type: PropTypes.string,
  }

  static defaultProps = {
    items: [],
    type: ITEM_TYPE.SELECT
  }

  state = {
    displayed: 30,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isItemsUpdated = !equals(nextProps.items, this.props.items);

    if (isItemsUpdated) {
      this.setState({ displayed: 30 });
    }

    return nextProps.open != this.props.open ||
      isItemsUpdated ||
      !equals(nextState.displayed, this.state.displayed) ||
      !equals(nextProps.selectedItems, this.props.selectedItems) ||
      !equals(nextProps.searchWords, this.props.searchWords)
  }

  componentDidMount() {
    this.items.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.items.removeEventListener('scroll', this.handleScroll);
  }

  getItemsRef = (node) => {
    if (node) {
      this.items = ReactDOM.findDOMNode(node);
    }
  }

  getItems = () => this.props.items.slice(0, this.state.displayed).map(item => ({
    ...item,
    checked: this.props.selectedItems.includes(String(item.id))
  }))

  handleFocus = ({ target }) => {
    const { length } = target.value;
    target.setSelectionRange(length, length);
  }

  handleScroll = () => {
    const {
      clientHeight,
      scrollHeight,
      scrollTop,
    } = this.items;

    if (scrollHeight - scrollTop === clientHeight) {
      const { items: { length } } = this.props;
      const { displayed } = this.state;
      const nextDisplayed = displayed + 30;

      this.setState({
        displayed: nextDisplayed < length ? nextDisplayed : length,
      })
    }
  }

  render() {
    const { items, searchWords, onSearch, onCheck, type } = this.props
    const Component = type === ITEM_TYPE.RADIO ? RadioItems : CheckboxItems
    const displayedItems = this.getItems();

    return (
      <div style={styles.itemListWithFilter}>
        <TextField
          hintText='Поиск...'
          ref={ c => c && c.focus && c.focus() }
          value={searchWords}
          onChange={onSearch}
          onFocus={this.handleFocus}
          fullWidth={true}
        />
        <Component
          ref={this.getItemsRef}
          items={displayedItems}
          onCheck={onCheck}
        />
        <Notification
          itemsCount={displayedItems.length}
          totalCount={items.length}
        />
      </div>
    )
  }
}

export default SelectDialog
