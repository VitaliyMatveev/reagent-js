import React from 'react';

import MaskedTextInput from '../TextField/MaskedTextInput';

export const BIK = {
  length: 9,
  message: 'БИК должен состоять из 9 цифр',
};

export const CHECKING_ACCOUNT = {
  length: 20,
  message: 'Расчётный счёт должен состоять из 20 цифр',
};

export const CORRESPONDENT_ACCOUNT = {
  length: 20,
  message: 'Корреспондентский счёт должен состоять из 20 цифр',
};

export const INN = {
  length: [10, 12],
  message: 'ИНН должен состоять из 10 цифр для юридического лица и 12 цифр для ' +
    'физического лица или индивидуального предпринимателя',
};

export const KPP = {
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
};

export const OGRN = {
  length: 13,
  message: 'ОГРН должен состоять из 13 цифр',
};

export const OKATO = {
  length: 11,
  message: 'ОКАТО должен состоять из 11 цифр',
};

export const OKOGU = {
  length: 7,
  message: 'ОКОГУ должен состоять из 7 цифр',
};

export const OKPO = {
  length: 8,
  message: 'ОКПО должен состоять из 8 цифр',
};

export const OKTMO = {
  length: [8, 11],
  message: 'ОКТМО должно содержать 8 или 11 знаков',
};

export const SNILS = {
  length: 11,
  message: 'СНИЛС должен состоять из 11 цифр',
  input: props => <MaskedTextInput mask="111-111-111 11" {...props} />,
};
