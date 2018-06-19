export const REQUIRED = 'Поле обязательно для заполнения';

export const SELECT_FIELD = {
  VALIDATE_MESSAGES: {
    MAX: max => `Должно быть выбрано менее ${max} элементов`,
    MIN: min => `Должно быть выбрано более ${min} элементов`,
    REQUIRED,
  }
}

export const RADIO_FIELD = {
  VALIDATE_MESSAGES: {
    REQUIRED,
  }
}

export const DATE_FIELD = {
  VALIDATE_MESSAGES: {
    INVALIDATE_DATE: 'Дата должна быть в формате дд.мм.гггг',
    REQUIRED,
  }
}

export const NUMBER_FIELD = {
  VALIDATE_MESSAGES: {
    INVALIDATE_NUMBER: 'Значение должно быть числом',
    MAX: max => `Значение должно быть меньшее, либо равное ${max}`,
    MIN: min => `Значение должно быть большее, либо равное ${min}`,
    INVALIDATE_STEP: (min, max) => (
      `Неверное значение. Два ближайщих возможных значения: ${min} и ${max}`
    ),
  },
};
