'use client'

import { Accordion, Text, Checkbox, Stack, TextInput, Title, Button, ScrollArea, Box, Divider } from '@mantine/core'
import { FilterInput, FilterOperator, FilterTypes, TagDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useResponsive } from '@hooks/useResponsive'

import { GameLibraryFilterAccordion } from './GameLibraryFilterAccordion'
import { GameLibraryFilterCountTag } from './GameLibraryFilterCountTag'

type Props = React.PropsWithChildren & {
  tags: TagDataFragment[]
  onFilterChange: (filter: FilterInput[] | null) => void
  onClose?: () => void
}

const OTHER_FILTERS = ['available']

export const GameLibraryFilterBar:React.FC<Props> = ({ tags, onFilterChange, onClose, children }) => {
  const { t } = useTranslation()

  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [otherFilter, setOtherFilter] = React.useState<string[]>([])
  const [initialized, setInitialized] = React.useState(false)
  const [minAge, setMinAge] = React.useState<number | undefined>()
  const [maxAge, setMaxAge] = React.useState<number | undefined>()

  const { xs } = useResponsive()

  React.useEffect(() => {
    if (!initialized) {
      setInitialized(true)

      return
    }

    const tagFilter: FilterInput | null = selectedTags.length !== 0
      ? {
          columnAccessor: 'tags',
          type: FilterTypes.Select,
          operator: FilterOperator.Like,
          value: selectedTags
        }
      : null

    const ageFilter: (FilterInput | null)[] = minAge
      ? [{
          columnAccessor: 'minAge',
          type: FilterTypes.Number,
          operator: FilterOperator.Gte,
          value: minAge
        }, {
          columnAccessor: 'minAge',
          type: FilterTypes.Number,
          operator: FilterOperator.Lte,
          value: maxAge || minAge
        }]
      : []

    const otherFilters: FilterInput[] = otherFilter.map((filter) => ({
      columnAccessor: filter,
      type: FilterTypes.Boolean,
      operator: FilterOperator.Is,
      value: true
    }))

    onFilterChange([tagFilter, ...ageFilter, ...otherFilters].filter((filter) => filter !== null))
  }, [selectedTags, maxAge, minAge, otherFilter])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSelectedTags((prev) => {
      if (prev.includes(value)) {
        return prev.filter((tag) => tag !== value)
      }

      return [...prev, value]
    })
  }

  const handleAgeChange = (key: 'min' | 'max', value?: number) => {
    if (key === 'min') {
      setMinAge(value ? value >= 0 ? value : 0 : undefined)
    } else {
      setMaxAge(value ? value >= 0 ? value : 0 : undefined)
    }
  }

  const handleOtherFilterChange = (key: string) => {
    setOtherFilter((prev) => {
      if (prev.includes(key)) {
        return prev.filter((filter) => filter !== key)
      }

      return [...prev, key]
    })
  }

  const handleResetFilter = () => {
    setSelectedTags([])
    setMinAge(undefined)
    setMaxAge(undefined)
    setOtherFilter([])
  }

  return (
    <Box
      h='100%'
      pb={{
        base: 0,
        md: 28
      }}
      px={{
        base: 0,
        md: 24
      }}
    >
      <Stack
        gap={0}
        h='100%'
        w='100%'
        bg='#fff'
        bd={xs ? 'none' : '1px solid gray.2'}
        style={{
          overflowY: 'auto'
        }}
      >
        <Stack
          p="24px"
        >
          <Title
            order={4}
          >
            {t('action.filter')}
          </Title>

          <Button
            variant='outline'
            size='xs'
            onClick={handleResetFilter}
            disabled={!selectedTags.length && !minAge && !maxAge && !otherFilter.length}
          >
            {t('action.clearFilter')}
          </Button>
          {xs && (
            <Button
              size='xs'
              onClick={onClose}
              disabled={!selectedTags.length && !minAge && !maxAge && !otherFilter.length}
            >
              {t('action.applyFilter')}
            </Button>
          )}
        </Stack>

        <Box px={24} w="100%">
          <Divider />
        </Box>

        <ScrollArea>
          <Stack
            p={24}
          >
            {children}

            <Accordion multiple>
              <GameLibraryFilterAccordion
                accordionKey='categories'
                titleExtension={selectedTags.length ? <GameLibraryFilterCountTag count={selectedTags.length} /> : null}
              >
                <Stack gap={8}>
                  {tags.map((tag) => (
                    <Checkbox
                      value={tag.id}
                      key={tag.id}
                      checked={selectedTags.includes(tag.id)}
                      onChange={handleOnChange}
                      label={tag.texts.name}
                    />
                  ))}
                </Stack>
              </GameLibraryFilterAccordion>

              <GameLibraryFilterAccordion
                accordionKey='age'
              >
                <Stack
                  gap={8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text>
                    {t('common.fromAge')}
                  </Text>
                  <TextInput
                    value={minAge || ''}
                    onChange={(event) => handleAgeChange('min', Number(event.currentTarget.value))}
                    type='number'
                    w={64}
                  />
                  <Text>
                    -
                  </Text>
                  <TextInput
                    w={64}
                    value={maxAge || ''}
                    onChange={(event) => handleAgeChange('max', Number(event.currentTarget.value))}
                    type='number'
                  />
                </Stack>
              </GameLibraryFilterAccordion>

              <GameLibraryFilterAccordion
                accordionKey='other'
                titleExtension={otherFilter.length ? <GameLibraryFilterCountTag count={otherFilter.length} /> : null}
              >
                {OTHER_FILTERS.map((filter) => (
                  <Checkbox
                    checked={otherFilter.includes(filter)}
                    key={filter}
                    label={t(`common.${filter}`)}
                    onChange={() => handleOtherFilterChange(filter)}
                  />
                ))}
              </GameLibraryFilterAccordion>
            </Accordion>
          </Stack>
        </ScrollArea>
      </Stack>
    </Box>
  )
}
