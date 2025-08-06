'use client'

import React from 'react'
import { Box, Flex, Stack, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { FilterInput, TagDataFragment, useGamesPaginatedQuery } from '@typings/graphql'
import { PaginationVariables } from '@typings/pagination'
import { DEFAULT_LIBRARY_PAGE_SIZE } from '@shared/components/dataTable/constants/dataTable'
import { debounce } from 'lodash'
import { useResponsive } from '@hooks/useResponsive'

import { GameLibraryFilterBar } from '../components/GameLibraryFilterBar'
import { GameLibraryList } from '../components/GameLibraryList'
import { ORDER_SELECTION_OPTIONS } from '../constants/constants'
import { GameOrderInput } from '../components/inputs/GameOrderInput'
import { GamePageInput } from '../components/inputs/GamePageInput'
import { GameSearchInput } from '../components/inputs/GameSearchInput'
import GameLibraryMobileFilter, { GameLibraryMobileFilterHandler } from '../components/GameLibraryMobileFilter'

type Props = {
  tags: TagDataFragment[]
}

export const GameLibraryView:React.FC<Props> = ({ tags }) => {
  const { t } = useTranslation()

  const [pageSize, setPageSize] = React.useState(DEFAULT_LIBRARY_PAGE_SIZE)
  const [loadMore, setLoadMore] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<string>(Object.keys(ORDER_SELECTION_OPTIONS)[0])
  const [activeFilter, setActiveFilter] = React.useState<FilterInput[] | null>(null)
  const [searchValue, setSearchValue] = React.useState('')

  const mobileFilterRef = React.useRef<GameLibraryMobileFilterHandler>(null)

  const { xs, md } = useResponsive()

  const refetchVariablesRef = React.useRef<PaginationVariables>({
    offset: 0,
    limit: DEFAULT_LIBRARY_PAGE_SIZE,
    orderBy: [ORDER_SELECTION_OPTIONS.titleAsc]
  })

  const { data, loading: gamesLoading, refetch } = useGamesPaginatedQuery({
    variables: {
      offset: 0,
      limit: DEFAULT_LIBRARY_PAGE_SIZE,
      orderBy: [ORDER_SELECTION_OPTIONS.titleAsc]
    }
  })

  const loading = React.useMemo(() => {
    return loadMore || gamesLoading
  }, [gamesLoading, loadMore])

  const handleFetchMore = React.useCallback(
    debounce(async () => {
      setLoadMore(true)

      try {
        await refetch(refetchVariablesRef.current)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadMore(false)
      }
    }, 300),
    []
  )

  const handlePageChange = (page: number) => {
    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      offset: (page - 1) * pageSize
    }

    handleFetchMore()
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)

    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      limit: size,
      offset: 0
    }

    handleFetchMore()
  }

  const handleOrderChange = (order: string) => {
    const orderBy = order ? ORDER_SELECTION_OPTIONS[order] : undefined

    setSelectedOrder(order)

    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      offset: 0,
      orderBy: orderBy ? [orderBy] : []
    }

    handleFetchMore()
  }

  const handleSearchChange = (search: string) => {
    setSearchValue(search)

    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      offset: 0,
      search
    }

    handleFetchMore()
  }

  const handleFilterChange = (filter: FilterInput[] | null) => {
    refetchVariablesRef.current = {
      ...refetchVariablesRef.current,
      filterBy: filter || []
    }

    setActiveFilter(filter || [])
    handleFetchMore()
  }

  return (
    <Stack
      h='100%'
    >
      <Box
        flex="0 0 auto"
      >
        <Title
          pt={24}
          px={24}
          order={3}
        >
          {t('gameLibrary.overview')}
        </Title>
      </Box>
      <Flex
        h='100%'
        direction={{
          base: 'column',
          md: 'row'
        }}
        style={{
          flex: '0 1 auto',
          flexDirection: 'row',
          ...(!xs && { overflow: 'hidden' })
        }}
      >
        <Box
          flex="0 0 320px"
          display={{
            base: 'none',
            md: 'block'
          }}
        >
          <GameLibraryFilterBar
            tags={tags}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <Flex
          direction={{
            base: 'column'
          }}
          gap={16}
          flex="1 1 auto"
          w='100%'
        >
          <Flex
            pr="24px"
            pt="24px"
            gap={{
              base: 8,
              md: 16
            }}
            px={{
              base: 24,
              md: 0
            }}
            style={{
              flex: '0 0 auto',
              flexDirection: 'row'
            }}
          >
            <Box
              flex="1 1 auto"
            >
              <GameSearchInput
                width={xs ? '100%' : 'auto'}
                value={searchValue}
                onChange={(value) => handleSearchChange(value)}
              />
            </Box>
            {!md
              ? (
                <>
                  <GamePageInput
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  />

                  <GameOrderInput
                    value={selectedOrder}
                    onChange={handleOrderChange}
                  />
                </>
                )
              : (
                <Box flex="0 0 auto"
                  style={{
                    position: 'relative'
                  }}
                >
                  <GameLibraryMobileFilter
                    ref={mobileFilterRef}
                    activeFilter={activeFilter?.length || 0}
                  >
                    <GameLibraryFilterBar
                      tags={tags}
                      onClose={() => mobileFilterRef.current?.close()}
                      onFilterChange={handleFilterChange}
                    >
                      <Stack
                        mt={16}
                        gap={32}
                      >
                        <GamePageInput
                          value={pageSize}
                          onChange={handlePageSizeChange}
                        />

                        <GameOrderInput
                          value={selectedOrder}
                          onChange={handleOrderChange}
                        />
                      </Stack>
                    </GameLibraryFilterBar>
                  </GameLibraryMobileFilter>
                </Box>
                )}
          </Flex>
          <Box
            flex="1 1 auto"
            style={{
              ...(!xs && { overflow: 'auto' })
            }}
          >
            <GameLibraryList
              data={data?.gamesPaginated}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </Box>
        </Flex>
      </Flex>
    </Stack>
  )
}
