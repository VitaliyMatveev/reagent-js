import React, {PropTypes} from 'react'

import TextField from './TextField'
import RichTextField from './RichTextField'
import CheckboxField from './CheckboxField'
import FileField from './FileField'
import ObjectField from './ObjectField'
import RadioField from './RadioField'
import ToggleField from './ToggleField'
import DateField from './DateField'
import SelectField from './SelectField'
import ArrayField from './ArrayField'
import AddressField from './AddressField'

const getFullFieldName = ({parentName, name}) => {
  if (!name) {
    return ''
  } else {
    return parentName ? `${parentName}[${name}]` : name
  }
}
const Field = (props) => {
  const {name, field, parentName, value, defaultValue, required} = props
  const {type} = field
  //const fieldValue = name ? value[name] : value
  const fieldName = field.name || getFullFieldName({parentName, name})
  switch (type) {
    case 'html': {
      return (
        <RichTextField
          key={name}
          {...field}
          required={required}
          name={fieldName}
          defaultValue={value}
        />
      )
    }
    case 'array': {
      return (
        <ArrayField
          key={name}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'file': {
      return (
        <FileField
          key={name}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'radio': {
      return (
        <RadioField
          key={name}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'checkbox': {
      return (
        <CheckboxField
          key={name}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'select': {
      return (
        <SelectField
          key={name}
          {...field}
          name={fieldName}
          value={value}
          defaultValue={defaultValue}
        />
      )
    }
    case 'object': {
      return (
        <ObjectField
          key={name}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'hidden': {
      return (
        <input
          key={name}
          type='hidden'
          name={fieldName}
          value={field.value}
        />
      )
    }

    case 'toggle': {
      return (
        <ToggleField
          key={name}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }

    case 'date': {
      return (
        <DateField
          key={name}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }

    case 'address': {
      return (
        <AddressField
          key={name}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }

    default: {
      const {title, ...other} = field
      return (
        <TextField
          key={name}
          title={title}
          {...other}
          required={required}
          name={field.name || fieldName}
          defaultValue={value}
        />
      )
    }
  }
}

Field.propTypes = {
  field: PropTypes.object.isRequired,
  name: PropTypes.string,
  parentName: PropTypes.string
}

export default Field
