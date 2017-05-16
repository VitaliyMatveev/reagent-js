import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import Field from './Fields/Field'
import FormJson from './FormJson'
import './style.less'

import TextField2 from './Fields/TextField'
import RichTextField2 from './Fields/RichTextField'
import SelectField2 from './Fields/SelectField'
import FileField2 from './Fields/FileField'
import ObjectField2 from './Fields/ObjectField'
import RadioField2 from './Fields/RadioField'
import ToggleField2 from './Fields/ToggleField'
import DateField2 from './Fields/DateField'

class Form extends Component {
  constructor(props){
    super(props)
  }

  getChildContext() {
    return {
      onChange: this.props.onChange
    }
  }

  static childContextTypes = {
    onChange: PropTypes.func
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
      const formJson = new FormJson()
      formJson.getFormJson(schema, form, onSubmit)
    }
  }

  render () {
    const {controls, style, direction='vertical',onCancel, schema, required, value, defaultValue, hideControls} = this.props
    const defaultControls = hideControls ? [] : [
      <RaisedButton
        key='submit'
        type='submit'
        labelPosition='before'
        icon={<SaveIcon/>}
        primary={true}
        label='Сохранить'
        style={{marginRight: '0.25rem'}}
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
    return (
      <form
        className={`c-editor-panel ${direction=='vertical' ? 'c-editor-panel_vertical' : ''}`}
        style={style}
        ref='form'
        onSubmit={this._handleSubmit.bind(this)}
        >
        <button type='submit' ref='submitButton' style={{display: 'none'}}/>
        <div className='c-editor-panel__content'>
          <Field
            field={{...schema}}
            required={required}
            type={schema.type}
            value={value}
            defaultValue={defaultValue}
          />
        </div>
        <div className='c-editor-panel__controls'>
          {controls || defaultControls}
        </div>
      </form>
    )
  }
}



export default Form

export {
  TextField2 as TextField,
  RichTextField2 as RichTextField,
  SelectField2 as SelectField,
  FileField2 as FileField,
  ObjectField2 as ObjectField,
  RadioField2 as RadioField,
  ToggleField2 as ToggleField,
  DateField2 as DateField
}
