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
