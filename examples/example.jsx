import React, {Component} from 'react'
import { Form } from '../src'
import AceEditor from 'react-ace'
import 'brace/mode/json';

import 'brace/theme/monokai';
const def = (
`{
  "type": "object",
  "properties": {
    "test": {
      "type": "string",
      "title": "Test"
    }
  }
}`
)
class App extends Component {
  constructor(props) {
    super (props)
    this.state={
      editor: def,
      scheme: JSON.parse(def)
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
        <AceEditor
          mode='json'
          theme='monokai'
          name='form_scheme'
          value={this.state.editor}
          fontSize={14}
          tabSize={2}
          onChange={this.handleChange}
        />
        <div
          style={{
            flex: '1 1 auto'
          }}
          >
          <Form
            schema={this.state.scheme}
          />
        </div>
        <div
          style={{
            flex: '1 0 100%'
          }}
          >
          <button type='button' onClick={this.handleSubmit}>Сгенерировать</button>
          <button type='button' onClick={this.handleDownload}>Скачать</button>
        </div>
      </div>
    )
  }
}

export default App
