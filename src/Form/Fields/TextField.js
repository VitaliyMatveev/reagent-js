import React, {PropTypes} from 'react'
import MaskedTextField from './MaskedTextField'
import MaterialTextField from 'material-ui/TextField'

const TextField  = ({mask, title, required, value, defaultValue, ...other}) => mask ? (
  <MaskedTextField
    mask={mask} {...other}
    title={ required && title ? title+' *' : title }
    required={required}
    defaultValue={value || defaultValue}
    {...other}
  />
) : (
  <MaterialTextField
    fullWidth={true}
    floatingLabelText={ required && title ? title+' *' : title }
    required={required}
    defaultValue={value || defaultValue}
    {...other}
  />
)

TextField.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  mask: PropTypes.string
}

export default TextField
