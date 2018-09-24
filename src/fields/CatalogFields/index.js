import catalogField from './decorators/catalogField';
import * as CATALOG_FIELDS from './constants';

export default Object.entries(CATALOG_FIELDS)
  .reduce((result, [fieldName, { input, ...rules }]) => {
    result[fieldName.toLowerCase()] = catalogField(rules)(input);
    return result;
  }, {});
