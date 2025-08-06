import { FilterTypes } from '@typings/graphql'

import { CustomFilterInputComponent } from '../../types/types'

import { StringFilterInput } from './StringFilterInput'
import { NumberFilterInput } from './NumberFilterInput'
import { DateFilterInput } from './DateFilterInput'
import { BooleanFilterInput } from './BooleanFilterInput'

export const filterInputTypes: Record<FilterTypes, CustomFilterInputComponent> = {
  [FilterTypes.String]: StringFilterInput,
  [FilterTypes.Number]: NumberFilterInput,
  [FilterTypes.Date]: DateFilterInput,
  [FilterTypes.Boolean]: BooleanFilterInput,
  [FilterTypes.Select]: () => null
}
