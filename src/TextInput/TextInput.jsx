import React, { PropTypes, Component } from 'react'

import './text-input.css'

export default class TextInput extends Component {
  componentDidUpdate(){
    if(this.props.focusOnLoad){
      this.refs['input'].focus()
    }
  }
  render(){
    const { helpText, onKeyUp, placeholder} = this.props
    let helpEl
    if(helpText){
      helpEl = <span className='text-input__help' dangerouslySetInnerHTML={{ __html: helpText }} />
    }
    return(
      <div className='text-input'>
        <input type='text' ref='input'
          className='text-input__input'
          onKeyUp={ onKeyUp }
          placeholder={ placeholder }
        />
        { helpEl }
      </div>
    )
  }
}

TextInput.propTypes = {
  helpText: PropTypes.string
}
