import React, { Component, PropTypes } from 'react'
import { EditButton, SaveButton, CloseButton } from '../Button/CircleButton.jsx'
import './editor-panel.less'
export default class EditorPanel extends Component{
  constructor(props){
    super(props)
    this.state={
      editing: false
    }
  }
  componentDidMount(){
    document.addEventListener('keyup', this.handleEscPress.bind(this))
  }
  componentWillUnmount(){
    document.removeEventListener('keyup', this.handleEscPress.bind(this))
  }
  handleEscPress(e) {
    if(e.keyCode == 27 &&
      this.refs.element &&
      this.refs.element.contains(e.target)
    ){      
      this.setState({editing: false})
    }
  }
  handleOpen(){
    this.setState({editing: true})
  }
  handleClose(){
    this.setState({editing: false})
  }
  handleSubmit(e){
    const { onSave } = this.props
    e.preventDefault()
    onSave(e.target)
    this.setState({editing: false})
  }
  render(){
    const { content, editor } = this.props
    const { editing } = this.state
    let panel
    if( editing ){
      panel = (
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <div className='editor-panel__content'>
            { editor }
          </div>
          <div className='editor-panel__buttons'>
            <SaveButton type='submit'/>,
            <CloseButton onClick={ this.handleClose.bind(this) }/>
          </div>
        </form>
      )
    }else{
      panel = (
        <div onClick={ this.handleOpen.bind(this) } style={{cursor: 'pointer'}}>
          <div className='editor-panel__content'>
            { content }
          </div>
          <div className='editor-panel__buttons'>
            <EditButton key='open' onClick={ this.handleOpen.bind(this) } />
          </div>
        </div>
      )
    }
    return (
      <div className={`editor-panel ${editing?'editor-panel_active':''}`} ref='element'>
        { panel }
      </div>
    )
  }
}



EditorPanel.propsTypes={
  onSave: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  editor: PropTypes.node.isRequired
}
