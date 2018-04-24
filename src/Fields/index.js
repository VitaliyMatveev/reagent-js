import TextField from './TextField'
import TimeRangeField from './TimeRange'
import ToggleField from './ToggleField'
import ObjectField from './ObjectField'

export const fields = {
  string: TextField,
  time_ranges: TimeRangeField,
  toggle: ToggleField,
  object: ObjectField,
}

export { default } from './Field'
