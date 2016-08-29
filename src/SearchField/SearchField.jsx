import React, { Component, PropTypes } from 'react'

import SearchWord from './SearchWord/SearchWord.jsx'
import TextInput  from '../TextInput/TextInput.jsx'
import './search-field.css'

export default class SearchField extends Component {
  handleSearchWordClk(index){
    let words = [].concat(this.props.searchWords)
    words.splice(index, 1)
    this.props.onChange(words)
  }
  handleKeyPress(e){
    const { searchWords, multipleWordsSearch, onChange } = this.props
    let searchText = e.target.value
    let words
    if(e.which=='13' && searchText.length>2){
      if(multipleWordsSearch){
        words = searchWords.concat([searchText])
        e.target.value = ''
      } else {
        words = [searchText]
      }
      onChange(words)
    }else if(e.which=='27'){
      if(searchText){
        if(!multipleWordsSearch){
          onChange([])
        }
        e.target.value = ''
      }else if(multipleWordsSearch){
        words = searchWords.concat([])
        words.pop()
        onChange(words)
      }
    }
  }
  render () {
    const { searchWords, multipleWordsSearch } = this.props
    let searchWordsPanel, helpText
    if(multipleWordsSearch){
      helpText='<b>Enter</b> добавить слово к поисковому запросу <b>Esc</b> для сброса'
      searchWordsPanel = (
        <div>
          {
            searchWords.map((words, i) => {
              return <SearchWord key={i}
                text={words} onClick={ this.handleSearchWordClk.bind(this, i) }
              />
            })
          }
        </div>
      )
    }else{
      helpText='<b>Enter</b> поиск по введенным словам <b>Esc</b> для сброса'
    }
    return (
      <div className='search-field'>
        <TextInput type='text'
          placeholder = 'Введите данные для поиска'
          helpText={ helpText }
          focusOnLoad={ true }
          onKeyUp={ (e) => this.handleKeyPress(e) }
        />
        { searchWordsPanel }
      </div>
    )
  }
}

SearchField.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchWords: PropTypes.array.isRequired,
  multipleWordsSearch: PropTypes.bool
}
