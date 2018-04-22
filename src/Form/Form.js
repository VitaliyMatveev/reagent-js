import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import renderField, { fields } from '../Fields/renderField'
import FormJson from './FormJson'
import './style.less'

const styles = {
  formSubmitButton: {
    display: 'none',
  },
  defaultSubmitButton: {
    marginRight: '0.25rem',
  }
}

class Form extends Component {
  getChildContext() {
    return {
      onChange: this.props.onChange
    }
  }

  static childContextTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    direction: 'vertical',
  }

  componentDidMount() {
    this.submit = () => this.refs.submitButton.click()
  }

  _handleSubmit(e){
    const {onSubmit, schema, type='application/json'} = this.props
    e.preventDefault();
    const form = e.target
    if (type=='multipart/form-data') {
      let formData = new FormData(form)
      onSubmit(formData, type)
    } else {
      const formJson = new FormJson({ fields, form, schema })
      formJson.getFormJson(onSubmit)
    }
  }

  renderControls = () => {
    const { hideControls, controls, onCancel } = this.props
    if (!hideControls) {
      return null
    }
    
    if (controls) {
      return controls
    }

    return [
      <RaisedButton
        key='submit'
        type='submit'
        labelPosition='before'
        icon={<SaveIcon/>}
        primary={true}
        label='Сохранить'
        style={styles.defaultSubmitButton}
      />,
      <RaisedButton
        key='cancel'
        secondary={true}
        labelPosition='before'
        icon={<CloseIcon/>}
        label='Отмена'
        onClick={onCancel}
      />
    ]
  }

  getFormClassName = () => `c-editor-panel ${this.props.direction=='vertical' ? 'c-editor-panel_vertical' : ''}`
  
  render () {
    const { style, schema: field, required, value, defaultValue } = this.props
    return (
      <form
        className={this.getFormClassName()}
        style={style}
        ref='form'
        onSubmit={this._handleSubmit.bind(this)}
        >
        <button type='submit' ref='submitButton' style={{display: 'none'}}/>
        <div className='c-editor-panel__content'>
          {
            renderField({
              field,
              required: required,
              value,
              defaultValue,
            })
          }
        </div>
        <div className='c-editor-panel__controls'>
          {this.renderControls()}
        </div>
      </form>
    )
  }
}



export default Form
