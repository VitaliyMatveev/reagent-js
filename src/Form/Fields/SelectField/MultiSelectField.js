import React, { PropTypes, Component } from 'react'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {List, ListItem} from 'material-ui/List'

import NavigationClose from 'material-ui/svg-icons/navigation/close'

import FieldTitle from '../FieldTitle'

class MultiSelectField extends Component {
  constructor (props) {
    super (props)
    const { value, defaultValue } = props
    this.state = {
      open: false,
      searchWords: '',
      focused: false,
      selectedItems: value || defaultValue || []
    }
  }

  componentDidMount = () => {
    this.validation()
  }

  handleFocus = () => this.setState({focused: true})

  handleBlur = () => this.setState({focused: false}, this.validation)

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false, searchWords: ''}, this.focus)

  handleSearch = (e) => {
    const { value } = e.target
    this.setState({searchWords: value})
  }

  handleItemCheck = (e, isSelected) => {
    const { selectedItems } = this.state
    const { value } = e.target
    if ( isSelected ) {
      this.setState({selectedItems: selectedItems.concat(value)})
    } else {
      this.setState({selectedItems: selectedItems.filter( id => id != value )})
    }
  }

  handleSelectedItemClick = (id) => {
    const { selectedItems } = this.state
    this.setState({selectedItems: selectedItems.filter( item => item != id )}, this.focus)
  }

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
  render () {
    const { title, items, name, required } = this.props
    const { searchWords, selectedItems, focused, open } = this.state
    const filteredItems = this.filterItems(items, searchWords, selectedItems)
    return (
      <div
        className='c-field'
        >
        <FieldTitle
          title={title}
          required={required}
          focused={focused || open}
        />
        <div>
          <TextField
            name='multiselect_input'
            value='Выбрать из справочника'
            onChange={ () => { return false } }
            fullWidth={ true }
            onClick={ this.handleOpen }
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
            ref='input'
          />
        <List>
            {
              selectedItems
                .map( id => items.find( item => item.id == id) )
                .map( ({ id, title, description }, index, arr) => (
                  <ListItem
                    key={ id }
                    leftIcon= { <NavigationClose/> }
                    value={ id }
                    onClick={ () => this.handleSelectedItemClick (id) }
                    primaryText={ `${title}${index == arr.length-1 ? '.' : ';'}` }
                    secondaryText={ description }
                  />
                ))
            }
          </List>
        </div>
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
        <Dialog
          title={ title }
          open={ open }
          onRequestClose={this.handleClose}
          >
          <div style={{
              maxHeight: 'inherit',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <TextField
              hintText='Поиск...'
              ref={ c => c && c.focus && c.focus() }
              onChange={this.handleSearch}
              fullWidth={true}
            />
            <List style={{
              overflow: 'auto'
              }}
              >
              {
                // <DictionaryItem
                //   id='all'
                //   title={`${searchWords == '' ? 'Выбрать все' : 'Выбрать найденное'}`}
                //   onCheck={ this.handleCheckAll }
                //   checked={ searchWords == '' ?
                //     items.length == selectedItems.length :
                //     isArrayEquals(selectedItems, findedItems)
                //   }
                // />
              }
              {
                filteredItems.map(item => (
                  <DictionaryItem
                    key={item.id}
                    { ...item }
                    checked={ selectedItems.includes(item.id+'') }
                    onCheck={ this.handleItemCheck }
                  />
                ))
              }
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}

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

export default MultiSelectField
