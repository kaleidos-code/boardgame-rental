'use client'

import React from 'react'
import { DataTable, DataTableColumn, DataTableProps, DataTableSortStatus, useDataTableColumns } from 'mantine-datatable'
import { useTranslation } from 'react-i18next'
import { PageInfo, PaginationVariables } from '@typings/pagination'
import { ActionIcon, Box, Flex } from '@mantine/core'
import { FilterInput } from '@typings/graphql'

import { MaterialIcon } from '../ui/MaterialIcon'

import { DataTableExtendedColumn, DataTableRecord } from './types/types'
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZES } from './constants/dataTable'
import { DataTableFilterPanel } from './components/DataTableFilterPanel'

export type BaseDataTableProps<T extends DataTableRecord> = {
  columns: DataTableExtendedColumn<T>[]
  records: DataTableProps<T>['records']
  tabelKey: string
  fetching?: boolean
  resizableColumns?: boolean
  sortableColumns?: boolean
  pinLastColumn?: boolean
  totalRecords?: number
  pageInfo?: PageInfo
  actionHeaderExtenstion?: (variables?: PaginationVariables) => React.ReactElement
  refetch?: (variables: PaginationVariables) => Promise<void>
  expansionContent?: (params: {
    record: T
    index: number
    collapse: () => void
  }) => React.ReactElement
}

export const BaseDataTable = function <T extends DataTableRecord> ({
  columns = [],
  records = [],
  fetching = false,
  resizableColumns = true,
  sortableColumns = true,
  tabelKey,
  pinLastColumn = true,
  totalRecords,
  pageInfo,
  actionHeaderExtenstion,
  expansionContent,
  refetch
}: BaseDataTableProps<T>): React.ReactElement {
  const { t } = useTranslation()

  const [filteredColumns, setFilteredColumns] = React.useState<DataTableColumn<T>['accessor'][]>([])
  const [expandedRecordIds, setExpandedRecordIds] = React.useState<string[]>([])

  const expansionColumn = React.useMemo<DataTableExtendedColumn<T> | null>(() => {
    if (!expansionContent) {
      return null
    }

    return {
      accessor: 'expander',
      title: '',
      sortable: false,
      resizable: false,
      hideFilter: true,
      width: '0%',
      render: (record: T) => {
        return (
          <Box
            h="100%"
            display="flex"
            style={{
              alignItems: 'center'
            }}
          >
            <ActionIcon
              size="sm"
              variant="transparent"
              onClick={() => {
                if (expandedRecordIds.includes(record.id)) {
                  setExpandedRecordIds(expandedRecordIds.filter(id => id !== record.id))
                } else {
                  setExpandedRecordIds([...expandedRecordIds, record.id])
                }
              }}
            >
              <MaterialIcon icon={expandedRecordIds.includes(record.id) ? 'remove' : 'add'} />
            </ActionIcon>
          </Box>
        )
      }
    }
  }, [expansionContent, expandedRecordIds])

  const refetchVariablesRef = React.useRef<PaginationVariables>({
    offset: 0,
    limit: DEFAULT_PAGE_SIZE
  })

  const [sortStatus, setSortStatus] = React.useState<DataTableSortStatus<T>>({
    columnAccessor: '',
    direction: 'asc'
  })

  const { effectiveColumns, resetColumnsToggle, resetColumnsOrder, resetColumnsWidth } = useDataTableColumns<T>({
    key: tabelKey,
    columns: ([...(expansionContent
      ? [expansionColumn]
      : []),
    ...columns] as DataTableExtendedColumn<T>[]).map(column => ({
      ...column,
      title: typeof column.title === 'string' ? column.title : t(column.titleKey || `dataTable.columns.${column.accessor as string}`),
      resizable: column.resizable === undefined ? resizableColumns : column.resizable,
      sortable: column.sortable === undefined ? sortableColumns : column.sortable
    }))
  })

  const dataTableColumns = React.useMemo(() => {
    return effectiveColumns.map(column => {
      return {
        ...column,
        resizable: false,
        ...(filteredColumns.includes(column.accessor) && {
          titleClassName: 'mantine-datatable-column-filtered'
        })
      }
    }) as DataTableColumn<T>[]
  }, [effectiveColumns, filteredColumns])

  React.useEffect(() => {
    resetColumnsToggle()
    resetColumnsOrder()
    resetColumnsWidth()
  }, [])

  const handleRefetch = async () => {
    await refetch?.(
      refetchVariablesRef.current
    )
  }
  const handlePageSizeChange = (size: number) => {
    refetchVariablesRef.current.limit = size
    handleRefetch()
  }

  const handlePageChange = (newPage: number) => {
    refetchVariablesRef.current.offset = (newPage - 1) * (pageInfo?.perPage || 1)
    handleRefetch()
  }

  const handleSortStatusChange = (status: DataTableSortStatus<T>) => {
    refetchVariablesRef.current.orderBy = [{
      columnAccessor: status.columnAccessor as string,
      direction: status.direction
    }]

    setSortStatus(status)
    handleRefetch()
  }

  const handleFilterChange = React.useCallback((filters: FilterInput[]) => {
    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      offset: 0,
      filterBy: filters
    }

    const difference = filters.filter(filter => !filteredColumns.includes(filter.columnAccessor as DataTableColumn<T>['accessor']))

    if (difference.length) {
      setFilteredColumns(filters.map(filter => filter.columnAccessor as DataTableColumn<T>['accessor']))
    }
    handleRefetch()
  }, [filteredColumns])

  return (
    <Flex
      direction="column"
      style={{
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <Flex
        className='mantine-datatable-action-header'
        flex={0}
        justify="space-between"
        align="center"
      >
        <DataTableFilterPanel
          columns={effectiveColumns}
          onFilterChange={handleFilterChange}
        />
        {actionHeaderExtenstion?.(refetchVariablesRef.current)}
      </Flex>
      <Box
        flex={1}
        style={{
          overflow: 'hidden'
        }}
      >
        <DataTable
          height="100%"
          pinLastColumn={pinLastColumn}
          pinFirstColumn={!!expansionContent}
          striped
          {...(expansionContent && {
            rowExpansion: {
              allowMultiple: true,
              content: expansionContent,
              trigger: 'never',
              expanded: {
                recordIds: expandedRecordIds,
                onRecordIdsChange: setExpandedRecordIds
              }
            }
          })}
          fw={500}
          fetching={fetching}
          withTableBorder
          noRecordsText={t('dataTable.noRecords')}
          storeColumnsKey={tabelKey}
          columns={dataTableColumns}
          records={records}
          sortStatus={sortStatus}
          page={pageInfo?.currentPage || 1}
          recordsPerPage={pageInfo?.perPage || DEFAULT_PAGE_SIZE}
          recordsPerPageOptions={DEFAULT_PAGE_SIZES}
          onRecordsPerPageChange={handlePageSizeChange}
          totalRecords={totalRecords}
          recordsPerPageLabel={t('dataTable.recordsPerPage')}
          onSortStatusChange={handleSortStatusChange}
          paginationText={({ from, to }) => t('dataTable.paginationText', {
            from,
            to,
            totalRecords
          })}
          onPageChange={handlePageChange}
        />
      </Box>
    </Flex>
  )
}
