import { FilterInput, OrderInput } from './graphql'

export type PageInfo = {
  currentPage: number
  totalPages: number
  perPage: number
}

export type PaginationVariables = {
  offset: number
  limit: number
  orderBy?: OrderInput[]
  filterBy?: FilterInput[]
  search?: string
  [key: string]: any
}

export enum FilterTypes {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  SELECT = 'select'
}
