import React from 'react'
import { useTranslation } from 'react-i18next'
import { ean13Pattern } from '@utils/pattern'
import { UNIT_ID_LENGTH } from '@shared/constants/input'

import { GameFormInput, GameInputWithUploads, ValidationSchema } from '../types/types'

export const useGameInputValidation = (existing?: GameFormInput): {
  validate: ValidationSchema
  initialValues: Partial<GameFormInput>
  transformValues: (values: GameFormInput) => GameInputWithUploads
} => {
  const { t } = useTranslation()

  const initialValues = React.useMemo<GameFormInput>(() => ({
    ean: '',
    title: '',
    publisher: '',
    minAge: 1,
    maxAge: 99,
    minPlayers: 1,
    maxPlayers: 2,
    minDuration: 1,
    maxDuration: null,
    gameUnits: [],
    tags: [],
    texts: {
      description: '',
      contents: ''
    },
    images: [],
    coverImage: []
  }), [existing])

  const getNumberRangeError = (value: number, gt: number, lt?: number): string | null => {
    if (!lt) {
      return value > gt ? null : t('error.input.minNumberInvalid', { gt })
    }

    return value > gt && value < lt ? null : t('error.input.numberRangeInvalid', { gt, lt })
  }

  const validate = {
    ean: (value: string) => !value ? null : new RegExp(ean13Pattern).test(value) ? null : t('error.input.eanInvalid'),
    title: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    publisher: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    minAge: (value: number, values: GameFormInput) => getNumberRangeError(value, 0, values?.maxAge || 0),
    maxAge: (value?: number, values?: GameFormInput) => value ? getNumberRangeError(value, values?.minAge || 0) : null,
    minPlayers: (value: number, values: GameFormInput) => getNumberRangeError(value, 0, values.maxPlayers || 0),
    maxPlayers: (value: number, values: GameFormInput) => getNumberRangeError(value, values.minPlayers || 0),
    minDuration: (value: number, values: GameFormInput) => getNumberRangeError(value, 0, values.maxDuration ? values.maxDuration + 1 : 0),
    maxDuration: (value: number, values: GameFormInput) =>
      value ? getNumberRangeError(value, values?.minDuration ? values?.minDuration - 1 : 0) : null,
    texts: {
      description: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty')
    },
    gameUnits: {
      weight: (value: number) => (value || 1) > 0 && (value !== 0) ? null : t('error.input.minNumberInvalid', { gt: 0 }),
      unitShortId: (value: string) =>
        value.trim().length === UNIT_ID_LENGTH ? null : t('error.input.mustBeNCharacters', { count: UNIT_ID_LENGTH })
    }

  }

  const transformValues = (values: GameFormInput): GameInputWithUploads => {
    const { texts, gameUnits, images, coverImage, ...rest } = values

    return {
      ...rest,
      gameUnits: gameUnits.map(({ unitShortId, incomplete, texts: unitTexts, notInStock, weight }) => ({
        unitShortId,
        weight,
        incomplete,
        inStock: !notInStock,
        texts: Object.entries(unitTexts).map(([key, value]) => ({
          key,
          value: incomplete && key === 'missingParts' ? value : ''
        }))
      })),
      texts: Object.entries(texts).map(([key, value]) => ({
        key,
        value
      })),
      images: [...images, ...coverImage]
    } as GameInputWithUploads
  }

  return {
    validate,
    initialValues,
    transformValues
  }
}
