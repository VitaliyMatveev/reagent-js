import React, { Component } from 'react'
import { Form } from 'react-final-form'
import { object, string, func, any } from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import SaveIcon from 'material-ui/svg-icons/content/save'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import arrayMutators from 'final-form-arrays'

import Field, { fields } from '../../fields'
import { convertData } from '../../utils'
import removeFieldsFromState from '../../mutators/removeFieldsFromState'

import './style.less'

const styles = {
  formSubmitButton: {
    display: 'none',
  },
  defaultSubmitButton: {
    marginRight: '0.25rem',
  }
}

export default class ReagentForm extends Component {
  static defaultProps = {
    direction: 'vertical',
  }

  static propTypes = {
    direction: string,
    onSubmit: func.isRequired,
    value: any,
    customFields: object,
  }

  static childContextTypes = {
    fields: object,
  }

  state={
    fields: this.props.customFields ? {...fields, ...this.props.customFields } : fields
  }

  getChildContext() {
    return {
      fields: this.state.fields,
    }
  }
  
  registerFormRef = el => this.form = el

  submit = () => this.form.dispatchEvent(new Event('submit'))

  renderControls = () => {
    const { hideControls, controls, onCancel } = this.props
    if (hideControls) {
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
      ref={this.registerFormRef}
      onSubmit={handleSubmit}
    >
      <button type='submit' ref='submitButton' style={styles.formSubmitButton}/>
      <div className='c-editor-panel__content'>
        {
          <Field
            field={this.props.schema}
          />
        }
      </div>
      <div className='c-editor-panel__controls'>
        {this.renderControls()}
      </div>
    </form>
  )
  
  handleSubmit = data => {
    const { onSubmit } = this.props
    convertData(data, onSubmit)
  }

  render () {
    const { value } = this.props
    return (
      <Form
        mutators={{
          ...arrayMutators,
          removeFieldsFromState
        }}
        onSubmit={this.handleSubmit}
        initialValues={value}
        render={this.renderForm}
      />
    )
  }
}
