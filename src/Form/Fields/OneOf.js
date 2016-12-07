import React, { PropTypes, Component } from 'react'

import Field from './ObjectField'
import SelectField from './SelectField'

class OneOf extends Component {
  constructor(props) {
    super(props)
    const {value, keyField, items} = props
    this.state = {
      selectedItem: value[keyField] ? items.findIndex(item => item.properties[keyField].value == value[keyField]) : 0
    }
  }
  _handleChange(value) {
    this.setState({selectedItem: value})
  }
  render() {
    console.debug('OneOf', this.props, this.state)
    const { items, keyField, parentName, value } = this.props
    const titles = items.map ((item, index) => ({title: item.title, id: index}))
    const { selectedItem } = this.state
    const { properties, required } = items[selectedItem]
    const keyFieldTitle = items[0].properties[keyField].title
    return (
      <div style={{width: '100%'}}>
        <SelectField
          value={selectedItem}
          title={keyFieldTitle}
          name={`${parentName}[title]`}
          onChange={this._handleChange.bind(this)}
          items={titles}
        />
        <Field
          name={parentName}
          value={value}
          properties={properties}
          required={required}
        />
      </div>
    )
  }
}

OneOf.propTypes = {
  keyField: PropTypes.string.isRequired
}

export default OneOf
