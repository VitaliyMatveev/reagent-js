import React, { PropTypes, Component } from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FieldTitle from './FieldTitle'

class RadioField extends Component {
  constructor (props) {
    super (props)
    this.state = {
      focused: false
    }
  }
  render () {
    const {name, style, items, title, required, onChange} = this.props
    const {focused} = this.state
    return (
      <div className='c-field'>
        <FieldTitle
          title={title}
          required={required}
          focused={focused}
        />
        <RadioButtonGroup
          name={name}
          defaultSelected={getDefaultSelected (this.props)}
          style={style}
          onChange={onChange}
          >
          {
            items.map (item => (
              <RadioButton
                key={item.id}
                value={item.id}
                label={item.title}
                required={ required }
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}
                {...item}
              />
            ))
          }
        </RadioButtonGroup>
      </div>
    )
  }
}

const getDefaultSelected = ({items, value, defaultValue}) => items.reduce((id, item) => {
  if (item.id == (value || defaultValue) || item.title == (value|| defaultValue)) {
    return item.id
  }
  return id
}, null)

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  style: PropTypes.object
}
export default RadioField
