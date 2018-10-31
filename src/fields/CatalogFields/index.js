import formField from '../../decorators/formField';
import { lengthParser, lengthValidator } from '../../utils';
import TextInput from '../TextField/TextInput';

export default ({ format, input, length, message, parse, validate }) =>
  formField({
    parse: parse || (length && lengthParser({ length })),
    validate: validate || (length && lengthValidator({ length, message })),
    format,
  })(input || TextInput)
