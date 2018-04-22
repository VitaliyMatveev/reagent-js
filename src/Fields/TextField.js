import React, { PureComponent } from 'react'
import { string, bool } from 'prop-types'
import MaskedTextField from './MaskedTextField'
import MaterialTextField from 'material-ui/TextField'

export default class TextField extends PureComponent {
  static propTypes = {
    title: string.isRequired,
    defaultValue: string,
    value: string,
    required: bool,
    mask: string
  }

  static getValue = (elements, name) => elements[name].value

  getTitle = () => {
    const { title, required } = this.props
    if (required) {
      return `${title} *`
    }
    return title
  }

  render() {
    const { mask, required, value, defaultValue, ...other } = this.props
    if (mask) {
      return (
        <MaskedTextField
          mask={mask}
          title={this.getTitle()}
          required={required}
          defaultValue={value || defaultValue}
          {...other}
        />
      )
    }

    return (
      <MaterialTextField
        fullWidth={true}
        autoComplete={false}
        floatingLabelText={this.getTitle()}
        required={required}
        defaultValue={value || defaultValue}
        {...other}
      />
    )
  }
}


