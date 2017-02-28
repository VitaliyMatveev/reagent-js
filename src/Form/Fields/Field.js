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
import MultiSelectField from './SelectField/MultiSelectField'
import ArrayField from './ArrayField'
import AddressField from './AddressField'
import TimeRange from './TimeRange'

import { getFullFieldName } from '../utils'
const Field = (props) => {
  const {name, field, parentName, value, defaultValue, required} = props
  const {type} = field
  //const fieldValue = name ? value[name] : value
  const fieldName = getFullFieldName(props)  
  switch (type) {
    case 'html': {
      return (
        <RichTextField
          key={fieldName}
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
          key={fieldName}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'file': {
      return (
        <FileField
          key={fieldName}
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
          key={fieldName}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'checkbox': {
      return (
        <CheckboxField
          key={fieldName}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'select': {
      const { multiple } = field
      const SelectFieldComponent = multiple ? MultiSelectField : SelectField
      return (
        <SelectFieldComponent
          key={fieldName}
          {...field}
          required={required}
          name={fieldName}
          value={value}
          defaultValue={defaultValue}
        />
      )
    }
    case 'object': {
      return (
        <ObjectField
          key={fieldName}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }
    case 'hidden': {
      return (
        <input
          key={fieldName}
          type='hidden'
          name={fieldName}
          value={field.value}
        />
      )
    }

    case 'toggle': {
      return (
        <ToggleField
          key={fieldName}
          {...field}
          name={fieldName}
          value={value}
        />
      )
    }

    case 'date': {
      return (
        <DateField
          key={fieldName}
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
          key={fieldName}
          {...field}
          required={required}
          name={fieldName}
          value={value}
        />
      )
    }

    case 'time_ranges': {
      return (
        <TimeRange
          key={fieldName}
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
          key={fieldName}
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
