import React, { Component, PropTypes } from 'react'
import {Editor as DraftEditor, EditorState, ContentState, RichUtils} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html';
import './editor.less'

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.focus = () => {
      console.log('focus');
      this.refs.editor.focus()
    }
    let editorState
    if(props.hasHtml){
      editorState = EditorState.createWithContent(
        stateFromHTML(props.value)
      )
    }else {
      editorState = EditorState.createWithContent(
        ContentState.createFromText(props.value)
      )
    }
    this.state = {
      editorState: editorState      
    }
    this.onChange = (editorState) => {
      this.setState({editorState})
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    console.log('handleKeyCommand', command, newState);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  render() {
    const { editorState } = this.state
    const { name } = this.props
    return (
      <div className='editor'>
        <div className='editor__body'>
          <DraftEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            ref='editor'
          />
          <input type='hidden' name={ name }
            value={ stateToHTML(editorState.getCurrentContent()) }
          />
        </div>
      </div>
    )
  }
}

Editor.propTypes={
  name: PropTypes.string.isRequired,
  value: PropTypes.node
}
