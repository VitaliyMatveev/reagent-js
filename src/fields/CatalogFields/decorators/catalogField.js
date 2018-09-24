import formField from '../../../decorators/formField';
import TextInput from '../../TextField/TextInput'
import * as CATALOG_FIELDS from '../constants';
import { lengthParser, lengthValidator } from '../utils';

export default ({ length, message, parse, validate, ...additionalProps }) =>
  (WrappedComponent = TextInput) => (
    formField({
      parse: parse || lengthParser({ length }),
      validate: validate || lengthValidator({ length, message }),
      ...additionalProps
    })(WrappedComponent)
);
