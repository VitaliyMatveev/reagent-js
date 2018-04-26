import TextField from './TextField'
import TimeRangeField from './TimeRange'
import ToggleField from './ToggleField'
import ObjectField from './ObjectField'
import CheckboxField from './CheckboxField'
import FileField from './FileField'

export const fields = {
  string: TextField,
  time_ranges: TimeRangeField,
  toggle: ToggleField,
  object: ObjectField,
  checkbox: CheckboxField,
  file: FileField,
}

export { default } from './Field'
