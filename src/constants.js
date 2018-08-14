export const REQUIRED = 'Поле обязательно для заполнения'

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
    PATTERN_MISMATCH: 'Не верный формат'
  }
}

export const TIME_RANGE_FIELD = {
  VALIDATE_MESSAGES: {
    PATTERN_MISMATCH: 'Заполните поле до конца',
    INVALID_TIME: 'Не верный диапазон времени'
  }
}

export const NUMBER_FIELD = {
  VALIDATE_MESSAGES: {
    INVALIDATE_NUMBER: 'Значение должно быть числом',
    NUMBER_IS_TOO_LARGE: 'Значение числа слишком большое',
    MAX: max => `Значение должно быть меньшее, либо равное ${max}`,
    MIN: min => `Значение должно быть большее, либо равное ${min}`,
    INVALIDATE_STEP: (min, max) => (
      `Неверное значение. Два ближайщих возможных значения: ${min} и ${max}`
    ),
  },
};
