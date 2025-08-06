import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_SYMBOLS
} from '@shared/constants/password'

import { EAN_LENGTH, UNIT_PREVIX_LENGTH } from '../shared/constants/input'

/* eslint-disable max-len */
export const urlPattern =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

export const postalPattern = /^[0-9]{5}$/

export const mailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const passwordPattern = (value: string) => {
  return new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${PASSWORD_SYMBOLS}])(?=.{${PASSWORD_MIN_LENGTH},})`
  ).test(value)
}

export const ean13Pattern = `^[0-9]{${EAN_LENGTH}}$`

export const unitPrefixPattern = `^[a-z]{${UNIT_PREVIX_LENGTH}}$`

export const numberPattern = /^[0-9]*$/

export const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
