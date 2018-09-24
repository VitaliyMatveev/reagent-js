import formField from '../../decorators/formField';
import { NUMBER_FIELD } from '../../constants';

import TextInput from '../TextField/TextInput';

/**
 * Returns digits length of a number
 * @param {number} num Input number
 * @returns {number} Digits length of a number
 */
const digitLength = (num) => {
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));

  return len > 0 ? len : 0;
};

/**
 * Returns num enlarged to an integer
 * @param {number} num Input number
 * @returns {number} Num enlarged to an integer
 */
const float2Fixed = (num) => {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }

  const dLen = digitLength(num);

  return dLen > 0 ? num * (10 ** dLen) : num;
};

/**
 * Returns accurate division of two numbers
 * @param {number} num1 First multiplier
 * @param {number} num1 Second multiplier
 * @returns {number} Accurate division of two numbers
 */
const times = (num1, num2) => {
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  return leftValue / (10 ** baseNum);
};

/**
 * Return accurate multiplication of two numbers
 * @param {number} num1 Dividend
 * @param {number} num1 Divisor
 * @returns {number} Quotient
 */
const divide = (num1, num2) => {
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);

  return times((num1Changed / num2Changed), 10 ** (digitLength(num2) - digitLength(num1)));
};

/**
 * Returns accurate addition of two numbers
 * @param {number} num1 First term
 * @param {number} num1 Second term
 * @returns {number} Accurate addition of two numbers
 */
const plus = (num1, num2) => {
  const baseNum = 10 ** Math.max(digitLength(num1), digitLength(num2));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
};

const isNumber = value => value && /^[+-]?\d+(\.\d+(?<!0))?(e[+-]?\d+)?$/i.test(value);

const format = value => value && value.toString().replace(/[^\d-+Ee.]/g, '');

const parse = (value) => {
  if (isNumber(value)) {
    return parseFloat(value);
  }

  return value;
};

const validate = (value, { min, max, step }) => {
  if (value) {
    if (typeof value !== 'number') {
      return NUMBER_FIELD.VALIDATE_MESSAGES.INVALIDATE_NUMBER;
    }

    if (!Number.isFinite(value)) {
      return NUMBER_FIELD.VALIDATE_MESSAGES.NUMBER_IS_TOO_LARGE;
    }

    if (min && min > value) {
      return NUMBER_FIELD.VALIDATE_MESSAGES.MIN(min);
    }

    if (max && max < value) {
      return NUMBER_FIELD.VALIDATE_MESSAGES.MAX(max);
    }

    if (step) {
      const stepCount = divide(value, step);

      if (!Number.isInteger(stepCount)) {
        const bottomLine = times(Math.floor(stepCount), step);

        return NUMBER_FIELD.VALIDATE_MESSAGES.INVALIDATE_STEP(bottomLine, plus(bottomLine, step));
      }
    }
  }

  return null;
};

export default formField({ format, parse, validate })(TextInput);
