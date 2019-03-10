import React, { Component } from 'react'
import array_field from './arrayField'
import commonFields from './commonFields'

const currentPath = window.location.pathname

const examples = {
  array_field,
  commonFields,
}

const findCurrenctExample = (currentPath, examples) => {
  const findedKey = Object.keys(examples).find(key => currentPath.includes(key))
  if (findedKey) {
    return examples[findedKey]
  }
  return null
}

class App extends Component {
  state={
    result: null
  }
  handleSubmit = data => {
    this.setState({ result: JSON.stringify(data)})
  }
  render() {
    const Example = findCurrenctExample(currentPath, examples)
    if (Example) {
      const { result } = this.state
      return <div>
        <h1>{Example.title}</h1>
        <a href='/'>go back</a>
        <Example onSubmit={this.handleSubmit} />
        {result &&
        <div>
          <h2>RESULT</h2>
          {
            result
          }
        </div>
        }
      </div>
    }
    return (
      <div>
        <h1>Select examples</h1>
        <ul>
        { Object.entries(examples).map(([key, { title }]) =>
            <li key={key}><a href={`/${key}`}>{title}</a></li>
          )
        }
      </ul>
      </div>
    )
  }
}

export default App
