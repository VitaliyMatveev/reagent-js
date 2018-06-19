import React, {Component, PropTypes} from 'react'
import Form from '../src'
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
  getChildContext() {

  }

  static childContextTypes = {
    MultiSelectField: PropTypes.shape({
      text: PropTypes.strins,
      searchFieldHintText: PropTypes.string,
      emptyText: PropTypes.string,
      hasMoreText: PropTypes.string,
      foundedText: PropTypes.string
    })
  }

  render() {
    // const items = getBigDict()
    return (
      <Form
        schema={{
          type: 'object',
          properties: {
            inputNumber: {
              max: 10,
              min: -10,
              placeholder: 'placeholder',
              step: 0.01,
              title: 'Number',
              type: 'number',
            },
          },
          required: ['inputNumber'],
        }}
        onSubmit={data => console.log('res:', data)}
      />
    )
  }
}

function getBigDict() {
  let dict = []
  for (let i=0; i < 300; i++) {
    dict.push({
      id: i,
      title: `example №${i}`,
      description: Date.now()
    })
  }
  return dict
}
export default App
