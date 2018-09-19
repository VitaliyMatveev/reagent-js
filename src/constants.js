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

export const OKTMO_FIELD = {
  VALIDATE_MESSAGES: {
    INVALID_LENGTH: 'ОКТМО должно содержать 8 или 11 знаков',
  }
}