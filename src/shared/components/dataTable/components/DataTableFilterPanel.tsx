import { ActionIcon, Button, Group, Menu, Stack, Select, Box } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { useClickOutside } from '@mantine/hooks'
import { FILTER_TYPE_OPERATOR_MAP } from '@shared/constants/filter'
import { toCamelCase } from '@utils/format'
import { useDebounce } from '@hooks/useDebounce'
import { FilterInput, FilterTypes } from '@typings/graphql'
import { isEqual } from 'lodash'

import { DataTableExtendedColumn, DataTableRecord, FilterPanelInput } from '../types/types'
import { MAX_FILTER } from '../constants/dataTable'
import { RoundNumberBadge } from '../../ui/RoundNumberBadge'

import { filterInputTypes } from './inputs/filterInputTypes'
import { StringFilterInput } from './inputs/StringFilterInput'

export type DataTableFilterPanelProps<T extends DataTableRecord> = {
  columns: DataTableExtendedColumn<T>[]
  onFilterChange?: (filters: FilterInput[]) => void
}

export type FilterPanelOperators = Record<string, string[]>

const DEFAULT_FILTER: FilterPanelInput[] = [{
  columnAccessor: '',
  availableOperators: [],
  type: null,
  operator: null,
  value: null,
  FilterInput: StringFilterInput
}]

export const DataTableFilterPanel = function <T extends DataTableRecord>
({ columns, onFilterChange }: DataTableFilterPanelProps<T>): React.ReactElement {
  const { t } = useTranslation()

  const [opened, setOpened] = React.useState(false)

  const ref = useClickOutside(() => setOpened(false))
  const prevFilterItemsRef = React.useRef<FilterPanelInput[]>(DEFAULT_FILTER)

  const [filterItems, setFilterItems] = React.useState<FilterPanelInput[]>(DEFAULT_FILTER)

  const mappedColumnAccessor = React.useMemo(() => {
    return columns.filter((column) => !column.hideFilter).map(filtered => ({
      value: filtered.accessor as string,
      label: filtered.title as string
    }))
  }, [columns, filterItems])

  const selectedAccessors = React.useMemo(() => filterItems.map((filter) => filter.columnAccessor), [filterItems])

  const activeFilters = React.useMemo(() =>
    filterItems.filter((filter) => filter.columnAccessor && filter.operator &&
  (filter.type === FilterTypes.Boolean ? filter.value !== null && filter.value !== undefined : filter.value))?.length || 0
  , [filterItems])

  const handleFilterChange = (currentFilter: FilterPanelInput[]) => {
    const mappedFilter = currentFilter.filter((filter) => {
      return filter.columnAccessor && filter.operator && filter.type && (
        filter.type === FilterTypes.Boolean
          ? filter.value !== null && filter.value !== undefined
          : filter.value)
    }
    ).map((filter) => ({
      columnAccessor: filter.columnAccessor,
      type: filter.type as FilterInput['type'],
      operator: filter.operator as FilterInput['operator'],
      value: filter.value
    }))

    onFilterChange && onFilterChange(mappedFilter)
  }

  const handleDebounce = useDebounce({
    callback: handleFilterChange,
    delay: 500
  })

  const prevFilterItems = prevFilterItemsRef.current

  React.useEffect(() => {
    if (!isEqual(filterItems, prevFilterItems)) {
      handleDebounce(filterItems)
    }

    prevFilterItemsRef.current = filterItems
  }, [filterItems, prevFilterItems])

  const handleChangeAccessor = (index: number, value: string | null) => {
    if (value === null || filterItems.length >= MAX_FILTER) {
      return
    }

    const selectedColumn = columns.find((item) => item.accessor === value)
    const availableOperators = selectedColumn?.type
      ? FILTER_TYPE_OPERATOR_MAP[selectedColumn?.type].map((filterOperator) => (
        {
          value: filterOperator,
          label: t(`dataTable.filterOperator.${toCamelCase(filterOperator)}`)
        }
      ))
      : []

    setFilterItems(filterItems.map((filter, i) => i === index
      ? {
          columnAccessor: value,
          availableOperators,
          type: selectedColumn?.type || null,
          operator: availableOperators.length ? availableOperators[0].value : null,
          FilterInput: selectedColumn?.CustomFilterInput || (selectedColumn?.type ? filterInputTypes[selectedColumn?.type || 'string'] : null),
          value: null
        }
      : filter))
  }

  const removeFilter = (index: number) => {
    if (filterItems.length === 1) {
      setFilterItems(DEFAULT_FILTER)

      return
    }

    setFilterItems(filterItems.filter((_, i) => i !== index))
  }

  const removeAllFilters = () => {
    setFilterItems(DEFAULT_FILTER)
    onFilterChange && onFilterChange([])
  }

  const addFilter = () => {
    setFilterItems([...filterItems, {
      columnAccessor: '',
      operator: null,
      value: null
    }])
  }

  const handleValueChange = (index: number, value: string) => {
    setFilterItems(filterItems.map((filter, i) => i === index
      ? {
          ...filter,
          value
        }
      : filter))
  }

  const handleFilterOperatorChange = (index: number, value: string | null) => {
    if (!value) {
      return
    }

    setFilterItems(filterItems.map((filter, i) => i === index
      ? {
          ...filter,
          operator: value as FilterInput['operator']
        }
      : filter))
  }

  return (
    <Box
      ref={ref}
      h="auto"
    >
      <Menu
        opened={opened}
        shadow="md"
        position='bottom-start'
        closeOnItemClick={false}
        closeOnClickOutside={false}
        withinPortal={false}
      >
        <Menu.Target>
          <Box
            pos="relative"
            display="inline-block"
          >
            <Button
              onClick={() => setOpened(true)}
              variant="transparent"
              style={{
                position: 'relative',
                padding: 0,
                height: 'auto',
                border: 'none'
              }}
              fz={12}
              fw={700}
              c="gray.7"
              leftSection={
                <MaterialIcon
                  iconProps={{
                    fz: 20,
                    c: 'blue.5'
                  }}
                  icon="filter_list"
                />
            }
            >
              {t('action.filter')}
            </Button>

            {activeFilters > 0 && <RoundNumberBadge number={activeFilters} />}
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Stack
            gap={16}
          >
            <Stack gap={8}>
              {filterItems.map((filter, index) => (
                <Group
                  key={`${filter.columnAccessor}-${index}`}
                  align='flex-end'
                >
                  <ActionIcon
                    variant='transparent'
                    mb={4}
                    disabled={index === 0 && filter.columnAccessor === ''}
                    onClick={() => removeFilter(index)}
                  >
                    <MaterialIcon icon="close" />
                  </ActionIcon>
                  <Select
                    label={t('dataTable.filterPanel.column')}
                    comboboxProps={{
                      withinPortal: false
                    }}
                    value={filter.columnAccessor || ''}
                    data={mappedColumnAccessor.filter((item) => !selectedAccessors.includes(item.value) || item.value === filter.columnAccessor)}
                    onChange={(value) => handleChangeAccessor(index, value)}
                  />
                  <Select
                    label={t('dataTable.filterPanel.operator')}
                    comboboxProps={{
                      withinPortal: false
                    }}
                    value={filter.operator || ''}
                    data={filter.availableOperators}
                    onChange={(value) => handleFilterOperatorChange(index, value)}
                  />
                  {filter.FilterInput && (
                    <Box
                      w={200}
                    >
                      <filter.FilterInput
                        onChange={(value) => handleValueChange(index, value)}
                        value={filter.type === FilterTypes.Boolean ? filter.value : (filter.value || undefined)}
                      />
                    </Box>
                  )}
                </Group>
              ))}
            </Stack>
            <Group
              justify='space-between'
            >
              <Group>
                <Button
                  onClick={addFilter}
                  disabled={filterItems.length >= MAX_FILTER}
                >
                  {t('action.addFilter')}
                </Button>
                <Button
                  onClick={removeAllFilters}
                >
                  {t('action.removeFilters')}
                </Button>
              </Group>
              <Button
                onClick={() => setOpened(false)}
              >
                {t('action.close')}
              </Button>
            </Group>
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}
