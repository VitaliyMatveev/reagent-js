import React, { PropTypes, Component } from 'react'
import FormField from '../FormField/FormField.jsx'
import './form.css'

export default class Form extends Component {
  componentDidMount(){
    this.children[0].focus()
  }
  render(){
    const { onSubmit, children } = this.props
    return (
      <form className='form-component' onSubmit={ onSubmit }>
        { children }
      </form>
    )
  }
}

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.arrayOf(FormField)
}
