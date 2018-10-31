import React from 'react';
import MaskedTextInput from './fields/TextField/MaskedTextInput';

export const REQUIRED = 'Заполните поле'

export const SELECT_FIELD = {
  VALIDATE_MESSAGES: {
    MAX: max => `Должно быть выбрано менее ${max} элементов`,
    MIN: min => `Должно быть выбрано более ${min} элементов`,
  }
}

export const DATE_FIELD = {
  VALIDATE_MESSAGES: {
    INVALIDATE_DATE: 'Дата должна быть в формате дд.мм.гггг',
  }
}

export const EMAIL_FIELD = {
  REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  VALIDATE_MESSAGES: {
    INVALID: 'Неверный формат'
  }
}

export const TEXT_FIELD = {
  VALIDATE_MESSAGES: {
    PATTERN_MISMATCH: 'Неверный формат'
  }
}

export const TIME_RANGE_FIELD = {
  VALIDATE_MESSAGES: {
    PATTERN_MISMATCH: 'Заполните поле до конца',
    INVALID_TIME: 'Неверный диапазон времени'
  }
}

export const NUMBER_FIELD = {
  VALIDATE_MESSAGES: {
    INVALIDATE_NUMBER: 'Значение должно быть числом',
    NUMBER_IS_TOO_LARGE: 'Значение числа слишком большое',
    MAX: max => `Значение должно быть меньше либо равно ${max}`,
    MIN: min => `Значение должно быть больше либо равно ${min}`,
    INVALIDATE_STEP: (min, max) => (
      `Неверное значение. Два ближайших возможных значения ${min} и ${max}`
    ),
  },
};

export const CATALOG_CONSTANTS = {
  BIK: {
    length: 9,
    message: 'БИК должен состоять из 9 цифр',
  },

  CHECKING_ACCOUNT: {
    length: 20,
    message: 'Расчётный счёт должен состоять из 20 цифр',
  },

  CORRESPONDENT_ACCOUNT: {
    length: 20,
    message: 'Корреспондентский счёт должен состоять из 20 цифр',
  },

  INN: {
    length: [10, 12],
    message: 'ИНН должен состоять из 10 цифр для юридического лица и 12 цифр для ' +
      'физического лица или индивидуального предпринимателя',
  },

  KPP: {
    length: 9,
    message: 'КПП должен содержать 9 знаков',
    parse: (value) => {
      if (value && value.length) {
        return value.slice(0, 4).replace(/\D/g, '') +
          value.slice(4, 6).replace(/\W/g, '').toUpperCase() +
          value.slice(6, 9).replace(/\D/g, '');
      }
      return value;
    }
  },

  OGRN: {
    length: [13, 15],
    message: 'ОГРН должен состоять из 13 цифр для юридического лица и 15 цифр для ' +
      'индивидуального предпринимателя',
  },

  OKATO: {
    length: 11,
    message: 'ОКАТО должен состоять из 11 цифр',
  },

  OKOGU: {
    length: 7,
    message: 'ОКОГУ должен состоять из 7 цифр',
  },

  OKPO: {
    length: 8,
    message: 'ОКПО должен состоять из 8 цифр',
  },

  OKTMO: {
    length: [8, 11],
    message: 'ОКТМО должно содержать 8 или 11 знаков',
  },

  SNILS: {
    input: props => <MaskedTextInput mask="111-111-111 11" {...props} />,
    validate: value => {
      if (value && !/\d{3}-\d{3}-\d{3}[ ]\d{2}/.test(value)) {
        return 'СНИЛС должен состоять из 11 цифр';
      }
      return null;
    },
  },
};
