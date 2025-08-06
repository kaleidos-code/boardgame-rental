import { createFormContext } from '@mantine/form'

import { GameFormInput, GameTransformedInput } from '../types/types'

export const [GameFormProvider, useGameFormContext, useGameForm] =
  createFormContext<GameFormInput, GameTransformedInput>()
