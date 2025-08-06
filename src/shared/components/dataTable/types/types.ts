import React from 'react'
import { FilterInput, FilterOperator, FilterTypes } from '@typings/graphql'
import { DataTableColumn } from 'mantine-datatable'

export type ServerPageInfo = {
  endCursor?: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string | null
}

export type ServerPaginationType<T> = {
  totalCount: number
  initialPaginationDate?: Date
  pageInfo: ServerPageInfo
  edges?: {
    cursor: string
    node: T
  }[] | null
}

export type CustomFilterInputProps = {
  onChange: (value: any) => void
  value: any
}

export type CustomFilterInputComponent = React.FC<CustomFilterInputProps>

export type FilterPanelInput = Omit<FilterInput, 'operator' | 'type'> & {
  availableOperators?: {
    value: FilterOperator
    label: string
  }[]
  FilterInput?: CustomFilterInputComponent | null
  operator?: FilterOperator | null
  type?: FilterTypes | null
}

export type DataTableRecord = {
  id: string
}

export type DataTableExtendedColumn<T extends DataTableRecord> = DataTableColumn<T> & {
  titleKey?: string
  type?: FilterTypes
  hideFilter?: boolean
  CustomFilterInput?: CustomFilterInputComponent | null
}
