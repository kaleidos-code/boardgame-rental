import { Box, Flex, Loader, Pagination, Stack } from '@mantine/core'
import { NoItemsCard } from '@shared/components/ui/NoItemsCard'
import {
  FilterOperator,
  FilterTypes,
  RentalsPaginatedQueryVariables,
  RentalStatus,
  useRentalsPaginatedQuery
} from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { RENTAL_MAX_PAGE_SIZE } from '../constants/constants'

import { RentalPaginatedListItem } from './RentalPaginatedListItem'

type Props = {
  isHistory?: boolean
}

export const RentalPaginatedList: React.FC<Props> = ({ isHistory }) => {
  const { t } = useTranslation()
  const fetchVariables = React.useRef({})

  const [loading, setLoading] = React.useState(true)

  const { data, fetchMore } = useRentalsPaginatedQuery({
    variables: fetchVariables.current as RentalsPaginatedQueryVariables,
    skip: !fetchVariables.current
  })

  const handleRefetch = async () => {
    setLoading(true)

    await fetchMore({
      variables: fetchVariables.current
    })

    setLoading(false)
  }

  React.useEffect(() => {
    fetchVariables.current = {
      limit: RENTAL_MAX_PAGE_SIZE,
      offset: 0,
      filterBy: [{
        columnAccessor: 'status',
        value: isHistory ? RentalStatus.Returned : RentalStatus.Rented,
        operator: FilterOperator.Eq,
        type: FilterTypes.Select
      }],
      orderBy: [{
        columnAccessor: isHistory ? 'returnedAt' : 'createdAt',
        direction: 'desc'
      }]
    }

    handleRefetch()
  }, [isHistory])

  const handlePageChange = (page: number) => {
    fetchVariables.current = {
      ...fetchVariables.current,
      offset: (page - 1) * RENTAL_MAX_PAGE_SIZE
    }

    handleRefetch()
  }

  return (
    <Stack
      gap={8}
      style={{ position: 'relative' }}
    >
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: 200
          }}
        >
          <Loader
            color="blue"
            size="lg"
          />
        </Flex>
      )}
      <Box
        style={{
          opacity: loading ? 0 : 1
        }}
      >
        {!data?.rentalsPaginated.nodes?.length
          ? (
            <NoItemsCard />
            )
          : (
            <Stack>
              {data?.rentalsPaginated?.nodes.map((rental) => (
                <RentalPaginatedListItem
                  key={rental.id}
                  rental={rental}
                />
              ))}
              {data?.rentalsPaginated.pageInfo.totalPages > 1 && (
                <Flex
                  justify="center"
                  align="center"
                >
                  <Pagination
                    value={data?.rentalsPaginated.pageInfo.currentPage}
                    onChange={handlePageChange}
                    total={data?.rentalsPaginated.pageInfo.totalPages}
                    getItemProps={(page) => ({
                      'aria-label': t('pagination.goToPage', { page })
                    })}
                    getControlProps={(control) => {
                      switch (control) {
                        case 'previous':
                          return { 'aria-label': t('pagination.previousPage') }
                        case 'next':
                          return { 'aria-label': t('pagination.nextPage') }
                        case 'first':
                          return { 'aria-label': t('pagination.firstPage') }
                        case 'last':
                          return { 'aria-label': t('pagination.lastPage') }
                        default:
                          return {}
                      }
                    }}

                  />
                </Flex>
              )}
            </Stack>
            )}
      </Box>
    </Stack>
  )
}
