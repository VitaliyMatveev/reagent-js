import React, { PropTypes, Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {List, ListItem} from 'material-ui/List'

const mergeArrays = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return arr1.concat(arr2)
      .reduce((result, item) =>
        result.includes(item) ? result : result.concat(item),[]
      )
  } else {
    return null
  }
}

const unmergeArrays = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return arr1.filter(item => !arr2.includes(item))
  } else {
    return null
  }
}

const isArrayEquals = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    return arr1.length == arr2.length &&
      arr1.every(item => arr2.includes(item))
  } else {
    return null
  }
}

class MultiSelectField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      open: false,
      searchWords: '',
      focused: false,
      selectedItems: []
    }
  }

  handleFocus = () => this.setState({focused: true})

  handleBlur = () => this.setState({focused: false})

  handleOpen = () => this.setState({open: true})

  handleClose = () => this.setState({open: false, searchWords: ''})

  handleSearch = (e) => {
    const { value } = e.target
    this.setState({searchWords: value})
  }

  handleItemCheck = (e, isSelected) => {
    const { selectedItems } = this.state
    const { max } = this.props
    const { value } = e.target
    if ( isSelected && selectedItems.length < max ) {
      this.setState({selectedItems: selectedItems.concat(value)})
    } else {
      this.setState({selectedItems: selectedItems.filter( id => id != value )})
    }
  }

  handleCheckAll = (e, isSelected) => {
    const { items } = this.props
    const { searchWords, selectedItems } = this.state
    if (searchWords == '') {
      this.setState({selectedItems: isSelected ? items.map(item => item.id) : []})
    } else {
      const findedItems = items.filter(({title}) => title.toLowerCase().includes(searchWords)).map(item => item.id)
      this.setState({selectedItems: isSelected ?
        mergeArrays(selectedItems, findedItems) : unmergeArrays(selectedItems, findedItems)
      })
    }
  }

  render () {
    const { title, items, name, required } = this.props
    const { searchWords, selectedItems, focused, open } = this.state
    const { muiTheme } = this.context
    const { hintColor, focusColor } = muiTheme.textField
    const findedItems = searchWords == '' ? items : items.filter(({title}) => title.toLowerCase().includes(searchWords))
    return (
      <div className='c-field'>
        <label
          className='c-field__label'
          style={{
            color: focused || open ? focusColor : hintColor
          }}
          >
          { title }
        </label>
        <div>
          <FlatButton
            label='Выбрать из справочника'
            secondary={ true }
            onClick={ this.handleOpen }
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
          />
          <ul>
            {
              selectedItems
                .map(id => items.find( item => item.id == id))
                .map((item, index, arr) => (
                  <li
                    key={item.id}
                    value={item.id}
                    onClick={this.handleItemCheck }
                    >
                    { `${item.title}${index == arr.length-1 ? '.' : ';'}` }
                  </li>
                ))
            }
          </ul>
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
          <div>
            <TextField
              hintText='Поиск...'
              ref={ c => c && c.focus && c.focus() }
              onChange={this.handleSearch}
              fullWidth={true}
            />
            <List>
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
                findedItems.map(item => (
                  <DictionaryItem
                    key={item.id}
                    { ...item }
                    checked={ selectedItems.includes(item.id) }
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

const DictionaryItem = ({id, title, checked, onCheck}) => (
  <ListItem
    key={id}
    primaryText={ title }
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

MultiSelectField.contextTypes = {
  muiTheme: PropTypes.object
}

export default MultiSelectField
