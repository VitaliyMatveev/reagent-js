import React, { PureComponent } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  radioButton: {
    paddingTop: 8,
  },
}

export default class RadioItems extends PureComponent {
  renderItem = ({ id, title }) => (
    <RadioButton
      key={id}
      value={id}
      label={title}
      style={styles.radioButton}
    />
  )
  render() {
    const { onCheck, items } = this.props
    return (
      <RadioButtonGroup onChange={onCheck}>
        { items.map(this.renderItem) }
      </RadioButtonGroup>
    )
  }
}
