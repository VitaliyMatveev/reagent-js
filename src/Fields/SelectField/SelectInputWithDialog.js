import React, { Component } from 'react'
import { shape, string, bool, func, number, arrayOf } from 'prop-types'
import TextField from 'material-ui/TextField'

import FieldTitle from '../FieldTitle'
import SelectDialog from './SelectDialog'
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
    }),
    items: arrayOf(
      shape({
        id: number,
        title: string,
      })
    ),
    title: string,
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

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false, searchWords: '' }, this.focus)

  handleSearch = (e, text) => this.setState({ searchWords: text })

  handleItemCheck = (e, isSelected) => {
    const { selectedItems } = this.state
    const { max } = this.props
    const { value } = e.target
    if (max === 1) {
      this.setState({ selectedItems: [value] })
    } else if ( isSelected ) {
      this.setState({selectedItems: selectedItems.concat(value)})
    } else {
      this.setState({selectedItems: selectedItems.filter( id => id != value )})
    }
  }

  handleSelectedItemClick = (id) => {
    const { selectedItems } = this.state
    this.setState({selectedItems: selectedItems.filter( item => item != id )}, this.focus)
  }

  handleChange = (e, text) => this.setState({open: true, searchWords: text})

  focus = () => this.refs.input.focus()

  validation = () => {
    const { selectedItems } = this.state
    const { min, max } = this.props
    const { input } = this.refs
    const node = input.getInputNode()
    //console.log('[MULTISELECT FIELD] validation', selectedItems, min, max);
    if (min && selectedItems.length < min) {
      node.setCustomValidity(`Должно быть выбрано более ${min} элементов`)
    } else if (max && selectedItems.length > max) {
      node.setCustomValidity(`Должно быть выбрано менее ${max} элементов`)
    } else {
      node.setCustomValidity('')
    }
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
  handleShowMore = () => {
    const { lastViewedIndex } = this.state
    if (lastViewedIndex < this.props.items.length) {
      this.setState({lastViewedIndex: lastViewedIndex + 20})
    }
  }

  render () {
    const { title, items, required, input, meta } = this.props
    const { onBlur, onFocus, value } = input
    const { active } = meta
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
            name='multiselect_input'
            //hintText={ getText(this.lang, MultiSelectField, 'text') }
            fullWidth
            value=''
            onChange={this.handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            ref='input'
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
          onMore={this.handleShowMore}
          onSearch={this.handleSearch}
          onCheck={this.handleItemCheck}
          // max={max}
        />
      </div>
    )
  }
}
