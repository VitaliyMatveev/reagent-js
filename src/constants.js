const REQUIRED = 'Поле обязательно для заполнения'

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

export const TEXT_FIELD = {
  VALIDATE_MESSAGES: {
    REQUIRED,
    PATTERN_MISMATCH: 'Не верный формат'
  }
}