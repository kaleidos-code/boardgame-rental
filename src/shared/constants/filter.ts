import { FilterOperator, FilterTypes } from '@typings/graphql'

export const FILTER_TYPE_OPERATOR_MAP: Record<FilterTypes, FilterOperator[]> = {
  [FilterTypes.Date]: [FilterOperator.Gt, FilterOperator.Gte, FilterOperator.Lt, FilterOperator.Lte, FilterOperator.Eq],
  [FilterTypes.Number]: [FilterOperator.Gt, FilterOperator.Gte, FilterOperator.Lt, FilterOperator.Lte, FilterOperator.Eq],
  [FilterTypes.String]: [FilterOperator.Like, FilterOperator.Eq, FilterOperator.Neq],
  [FilterTypes.Boolean]: [FilterOperator.Is],
  [FilterTypes.Select]: [FilterOperator.Eq, FilterOperator.Neq]
}
