import React, {Component} from 'react'
import { Form } from '../src'
import AceEditor from 'react-ace'
import 'brace/mode/json';

import 'brace/theme/monokai';
class App extends Component {
  constructor(props) {
    super (props)
    var def = {
      type: 'object',
      properties: {
        test: {
          type: 'string',
          title: 'Test'
        }
      }
    }
    this.state={
      editor: JSON.stringify(def),
      scheme: def
    }
  }
  handleChange = val => this.setState({editor: val})
  handleSubmit = () => {
    const scheme = JSON.parse(this.state.editor)
    this.setState({scheme})
  }
  handleDownload = () => {
    const blob = new Blob([JSON.stringify(JSON.parse(this.state.editor), null, 2)], {type: 'application/json'})
    let a = document.createElement('a')
    a.setAttribute('href', URL.createObjectURL(blob, 'application/json'))
    a.setAttribute('download', 'scheme.json')
    a.click()
  }
  render() {
    return (
      <div>
        <AceEditor
          mode='json'
          theme='monokai'
          name='form_scheme'
          value={this.state.editor}
          onChange={this.handleChange}
        />
        <button type='button' onClick={this.handleSubmit}>Сгенерировать</button>
        <button type='button' onClick={this.handleDownload}>Скачать</button>
        <Form
          schema={this.state.scheme}
        />
      </div>
    )
  }
}

export default App
