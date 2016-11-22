import React, { PropTypes, Component } from 'react'
import {Editor as DraftEditor, EditorState, ContentState, RichUtils} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html';
import {BlockStyleControls, InlineStyleControls} from './RichTextEditorControls'

class RichTextField extends Component {
  constructor(props){
    super(props)
    this.focus = () => this.refs.editor.focus()

    const editorState = EditorState.createWithContent(
      stateFromHTML(props.defaultValue || '')
    )
    this.state={
      editorState
    }
  }
  _handleChange(editorState){
    this.setState({editorState})
  }

  _toggleBlockType(blockType) {
     this._handleChange(
       RichUtils.toggleBlockType(
         this.state.editorState,
         blockType
       )
     )
   }

  _toggleInlineStyle(inlineStyle) {
    this._handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }
  render () {
    const {name, title} = this.props
    const {editorState} = this.state
    const focused = editorState.getSelection().getHasFocus()
    const value = editorStateToValue(editorState)
    let className = 'c-rich-text-field c-panel-with-html'
    if(focused){
      className += ' c-rich-text-field_focused'
    }
    if(value){
      className += ' c-rich-text-field_has-value'
    }
    return (
      <div className={className}>
        <input
          type='hidden'
          name={ name }
          className='c-rich-text-field__editor'
          placeholder='test'
          value={value || ''}
        />
        <label className='c-rich-text-field__label'>
          {title}
        </label>
        <div className='c-rich-text-field__controls'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this._toggleBlockType.bind(this)}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this._toggleInlineStyle.bind(this)}
          />
        </div>
        <DraftEditor
          editorState={editorState}
          onChange={this._handleChange.bind(this)}
          ref='editor'
        />
        <hr className='c-rich-text-field__border'/>
        <hr className='c-rich-text-field__focus-border'/>
      </div>
    )
  }
}

const editorStateToValue = (editorState) => {
  const value = stateToHTML(editorState.getCurrentContent())
  return value != '<p><br></p>' ? value : null
}

RichTextField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default RichTextField;
