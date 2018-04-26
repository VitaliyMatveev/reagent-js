import React, { Component } from 'react'
import { Form } from 'react-final-form'
import R from 'ramda'
// import { func } from 'prop-types'
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

export default class RegentForm extends Component {
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
  
  handleSubmit = data => {
    const { onSubmit } = this.props
    convetData(data, onSubmit)
  }

  render () {
    const { value } = this.props
    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={value}
        render={this.renderForm}
      />
    )
  }
}

const parseFile = (files, path) => {
  if (files.length > 0) {
    const { name: filename, size, lastModified: last_modified, type: mime_type } = files[0]
    return new Promise((resolve) => {
      const fr = new FileReader()
      fr.addEventListener('load', () => resolve([
        path,
        [{
          filename,
          size,
          last_modified,
          mime_type,
          content: fr.result
        }]
      ]))

      fr.readAsDataURL(files[0])
    })
  }
  return null
}

const setValue = (data, value, path) => console.log('set value') || R.assocPath(path, value, data)

const getPath = (path, name) => path ? path.concat(name) : [name]

const convetData = (data, cb) => {
  const promises = []

  const findFileList = (value, path) => {
    if (Array.isArray(value)) {
      value.map((el, index) => findFileList(el, getPath(path, index)))
    }

    if (typeof value === 'object') {
      if (value instanceof FileList) {
        promises.push(parseFile(value, path))
      }
      Object.keys(value).reduce((res, key) => ({
        ...res,
        [key]: findFileList(value[key], getPath(path, key))
      }), {})
    }
  }

  findFileList(data)

  if (promises.length > 0) {
    let result = data
    Promise
    .all(promises)
    .then(res => res.forEach(([path, value]) => {
      result = setValue(result, value, path)
    })
    ).then(() => cb(result))
    .catch(e => console.log('error', e))
  } else {
    cb(data)
  }
}