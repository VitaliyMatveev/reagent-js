import React, { Component } from 'react';
import { func, number, oneOfType, string } from 'prop-types';

import { NUMBER_FIELD } from '../../constants';

import TextField from '../TextField';

export default class extends Component {
  static propTypes = {
    format: func,
    max: oneOfType([
      number,
      string,
    ]),
    min: oneOfType([
      number,
      string,
    ]),
    name: string,
    step: oneOfType([
      number,
      string,
    ]),
    validate: func,
  }

  static defaultProps = {
    format: null,
    max: null,
    min: null,
    name: null,
    step: null,
    validate: null,
  }

  format = (value, name) => {
    const { format } = this.props;
    let formattedValue = value && value.toString().replace(/[^\d-+Ee.]/g, '');
    const numericValue = parseFloat(formattedValue);

    if (numericValue == formattedValue) {
      formattedValue = numericValue;
    }

    if (format) {
      return format(formattedValue, name);
    }

    return formattedValue;
  }

  validate = (value, allValues) => {
    const { min, max, validate } = this.props;
    let { step } = this.props;

    if (value) {
      let numericValue = parseFloat(value);

      if (numericValue != value) {
        return NUMBER_FIELD.VALIDATE_MESSAGES.INVALIDATE_NUMBER;
      }

      if (min && min > numericValue) {
        return NUMBER_FIELD.VALIDATE_MESSAGES.MIN(min);
      }

      if (max && max < numericValue) {
        return NUMBER_FIELD.VALIDATE_MESSAGES.MIN(max);
      }

      if (step) {
        let rank = 1;

        while (
          !Number.isInteger(numericValue * rank) ||
          !Number.isInteger(step * rank)
        ) {
          rank *= 10;
        }

        numericValue *= rank;
        step *= rank;

        if (!Number.isInteger(numericValue / step)) {
          numericValue = Math.floor(numericValue / step) * step;

          return NUMBER_FIELD.VALIDATE_MESSAGES.INVALIDATE_STEP(
            numericValue / rank,
            (numericValue + step) / rank,
          );
        }
      }
    }

    if (validate) {
      return validate(value, allValues);
    }
  }

  render() {
    return (
      <div className="c-number-field">
        <TextField
          {...this.props}
          format={this.format}
          formatOnBlur
          validate={this.validate}
        />
      </div>
    );
  }
}
