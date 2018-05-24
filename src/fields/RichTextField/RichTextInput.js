import React, { Component } from 'react'
import { func, shape, string } from 'prop-types'
import {Editor as DraftEditor, EditorState, RichUtils} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html';
import {BlockStyleControls, InlineStyleControls} from './RichTextEditorControls'

export default class RichTextInput extends Component {
  static propTypes = {
    input: shape({
      onChange: func,
      name: string,
      value: string,
    })
  }

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
  
  handleChange = editorState => {
    this.setState({ editorState })
    this.props.input.onChange(editorStateToValue(editorState))
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
    const { input: { value }, title} = this.props
    const { editorState } = this.state
    const focused = editorState.getSelection().getHasFocus()
    let className = 'c-rich-text-field c-panel-with-html'
    if(focused){
      className += ' c-rich-text-field_focused'
    }
    if(value){
      className += ' c-rich-text-field_has-value'
    }
    return (
      <div className={className}>
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
          onChange={this.handleChange}
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
