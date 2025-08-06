export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_SYMBOLS = '!@#$%§&*+-:;,.?_~'
export const MAPPED_PASSWORD_SYMBOLS = PASSWORD_SYMBOLS.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

export const PASSWORD_PATTERN = new RegExp(
  `^(?=.*[A-Z])(?=.*[0-9])(?=.*[${MAPPED_PASSWORD_SYMBOLS}]).{${PASSWORD_MIN_LENGTH},}$`
)
