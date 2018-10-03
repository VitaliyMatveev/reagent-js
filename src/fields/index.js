import TextField from './TextField'
import TimeRangeField from './TimeRangeField'
import ToggleField from './ToggleField'
import ObjectField from './ObjectField'
import CheckboxField from './CheckboxField'
import FileField from './FileField'
import AddressField from './AddressField'
import SelectField from './SelectField'
import RadioField from './RadioField'
import DateField from './DateField'
import BooleanField from './BooleanField'
import ArrayField from './ArrayField'
import RichTextField from './RichTextField'
import NumberField from './NumberField';
import catalogField from './CatalogFields';

import { CATALOG_CONSTANTS } from '../constants';

export const fields = {
  string: TextField,
  time_ranges: TimeRangeField,
  toggle: ToggleField,
  object: ObjectField,
  checkbox: CheckboxField,
  file: FileField,
  address: AddressField,
  select: SelectField,
  radio: RadioField,
  date: DateField,
  boolean: BooleanField,
  array: ArrayField,
  html: RichTextField,
  number: NumberField,
  bik: catalogField(CATALOG_CONSTANTS.BIK),
  checking_account: catalogField(CATALOG_CONSTANTS.CHECKING_ACCOUNT),
  correspondent_account: catalogField(CATALOG_CONSTANTS.CORRESPONDENT_ACCOUNT),
  inn: catalogField(CATALOG_CONSTANTS.INN),
  kpp: catalogField(CATALOG_CONSTANTS.KPP),
  ogrn: catalogField(CATALOG_CONSTANTS.OGRN),
  okato: catalogField(CATALOG_CONSTANTS.OKATO),
  okogu: catalogField(CATALOG_CONSTANTS.OKOGU),
  okpo: catalogField(CATALOG_CONSTANTS.OKPO),
  oktmo: catalogField(CATALOG_CONSTANTS.OKTMO),
  snils: catalogField(CATALOG_CONSTANTS.SNILS),
}

export { default } from './Field'
