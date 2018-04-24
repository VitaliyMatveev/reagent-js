import React, { PureComponent } from 'react'
import { Form } from 'react-final-form'

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import Field from '../Fields'
// import FormJson from './FormJson'
import './style.less'

const styles = {
  formSubmitButton: {
    display: 'none',
  },
  defaultSubmitButton: {
    marginRight: '0.25rem',
  }
}

export default class RegentForm extends PureComponent {
  static defaultProps = {
    direction: 'vertical',
  }

  // componentDidMount() {
  //   this.submit = () => this.refs.submitButton.click()
  // }

  // _handleSubmit(e){
  //   const {onSubmit, schema, type='application/json'} = this.props
  //   e.preventDefault();
  //   const form = e.target
  //   if (type=='multipart/form-data') {
  //     let formData = new FormData(form)
  //     onSubmit(formData, type)
  //   } else {
  //     const formJson = new FormJson({ fields, form, schema })
  //     formJson.getFormJson(onSubmit)
  //   }
  // }

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
  
  renderForm = ({ handleSubmit }) => (
    <form
      className={this.getFormClassName()}
      style={this.props.style}
      ref='form'
      onSubmit={handleSubmit}
    >
      <button type='submit' ref='submitButton' style={styles.formSubmitButton}/>
      <div className='c-editor-panel__content'>
        {
          <Field
            field={this.props.schema}
            required={this.props.required}
          />
        }
      </div>
      <div className='c-editor-panel__controls'>
        {this.renderControls()}
      </div>
    </form>
  )

  render () {
    const { onSubmit, value } = this.props
    return (
      <Form
        onSubmit={onSubmit}
        initialValues={value}
        render={this.renderForm}
      />
    )
  }
}

