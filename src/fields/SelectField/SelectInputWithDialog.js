import React, { Component } from 'react'
import { shape, string, bool, func, number, arrayOf } from 'prop-types'
import TextField from 'material-ui/TextField'

import SelectDialog from '../../components/SelectDialog'
import FieldTitle from '../../components/FieldTitle'

import SelectedItemList from './SelectedItemList'

export default class SelectInputWithDialog extends Component {
  static propTypes = {
    input: shape({
      onChange: func,
      onBlur: func,
      onFocus: func,
      value: arrayOf(number)
    }).isRequired,
    meta: shape({
      active: bool,
      error: string,
      touched: bool,
    }),
    items: arrayOf(
      shape({
        id: number,
        title: string,
      })
    ),
    title: string,
    max: number,
  }
  static defaultProps = {
    input: {
      value: []
    }
  }

  constructor (props) {
    super (props)
    this.state = {
      open: false,
      searchWords: '',
    }
  }

  handleClose = () => {
    const { isMouseDown } = this.state;
    let newState = { isMouseDown: false };

    if (!isMouseDown) {
      newState = { ...newState, open: false, searchWords: '' };
    }

    this.setState(newState);
  }

  handleSearch = (e, text) => this.setState({ searchWords: text })

  handleItemCheck = (e, isSelected) => {
    const { value: selectedItems, onChange } = this.props.input
    const { max } = this.props
    const { value } = e.target
    if (max === 1) {
      onChange(value)
    } else if ( isSelected ) {
      onChange(selectedItems ? selectedItems.concat(value) : [value])
    } else {
      onChange(selectedItems.filter( id => id != value ))
    }
  }

  handleSelectedItemClick = id => {
    const { max, input: { value, onChange } } = this.props
    if (max === 1) {
      onChange(null)
    } else {
      onChange(value.filter(el => el !== id))
    }
  }

  handleFocus = (e) => {
    const { input: { onFocus } } = this.props;

    onFocus(e);
    e.target.blur();
    this.setState({ open: true });
  }

  handleMouseDown = () => {
    this.setState({ isMouseDown: true });
  }

  filterItems (items, searchWords, selectedItems) {
    return items.filter( item =>
      !item.disabled && (
        searchWords == '' ? true : item.title.toLowerCase().includes(searchWords.toLowerCase())
      ) && (
        !selectedItems.includes(item)
      )
    )
    //const findedItems = searchWords == '' ? items : items.filter(({title}) => title.toLowerCase().includes(searchWords))
  }


  render () {
    const { title, items, required, input, meta, max } = this.props
    const { onBlur, onFocus, value } = input
    const { active, touched, error } = meta
    const { searchWords, open } = this.state

    const filteredItems = this.filterItems(items, searchWords, value)
    return (
      <div className='c-field'>
        <FieldTitle
          title={title}
          required={required}
          focused={active || open}
        />
        <div>
          <TextField
            autoComplete="off"
            name='multiselect_input'
            hintText='поиск...'
            fullWidth
            value=''
            onFocus={this.handleFocus}
            onBlur={onBlur}
            onMouseDown={this.handleMouseDown}
            ref='input'
            style={{ cursor: 'pointer' }}
          />
          <SelectedItemList
            name={name}
            items={items}
            onClick={this.handleSelectedItemClick}
            selectedItems={value}
            dialogOpen={this.state.open}
          />
        </div>
        <SelectDialog
          title={title}
          open={this.state.open}
          items={filteredItems}
          selectedItems={value}
          searchWords={searchWords}
          totalCount={items.length}
          onClose={this.handleClose}
          onSearch={this.handleSearch}
          onCheck={this.handleItemCheck}
          type={max === 1 ? 'radio' : 'select'}
        />
        {
          touched && error && <span style={{color: 'red'}}>{error}</span>
        }
      </div>
    )
  }
}
