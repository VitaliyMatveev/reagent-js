import React, { Component, PropTypes } from 'react'

import { EditButton, SaveButton, CloseButton } from '../Button/CircleButton.jsx'

export default class EditabelTableRow extends Component{
  constructor(props){
    super(props)
    this.state={
      editing: false
    }
  }
  handleOpen(){
    this.setState({editing: true})
  }
  handleClose(){
    this.setState({editing: false})
  }
  handleSave(){
    console.log('save', this.refs.form)
  }

  render(){
    const { baseColumns, editigColumns } = this.props
    let columns
    if(this.state.editing){
      columns = editigColumns.map( (column, i) =>
        <td key={ i }>{ column }</td>
      )
      return (
        <tr>
        { columns }
        <td>
          <SaveButton onClick={ this.handleSave.bind(this) } />
          <CloseButton onClick={ this.handleClose.bind(this) } />
        </td>
      </tr>
      )
    } else {
      columns = baseColumns.map( (column, i) =>
        <td key={ i }>{ column }</td>
      )
      return (
        <tr>
          { columns }      
        </tr>
      )
    }
  }
}

EditabelTableRow.propTypes={
  baseColumns: PropTypes.array.isRequired,
  editigColumns: PropTypes.array.isRequired
}
