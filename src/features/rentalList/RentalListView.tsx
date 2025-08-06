'use client'

import React from 'react'
import { BaseDataTable } from '@shared/components/dataTable/BaseDataTable'
import {
  RentalDataFragment,
  RentalStatus,
  useRentalsPaginatedQuery,
  useReturnRentalMutation
} from '@typings/graphql'
import { Flex, Stack, Title, Checkbox } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { ActionsRenderCell } from '@shared/components/dataTable/components/ActionsRenderCell'
import { actionsColumn } from '@shared/components/dataTable/columns/actionsColumn'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PaginationVariables } from '@typings/pagination'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { usePermissions } from '@hooks/usePermissions'

import { rentalColumns } from './components/dataTable/rentalColumns'
import { RentalRowAdditionalActions } from './components/dataTable/RentalRowAdditionalActions'
import { RentalColumn } from './types/types'
import { UpdateRentalModal } from './components/UpdateRentalModal'

export const RentalListView: React.FC = () => {
  const { t } = useTranslation()

  const { can } = usePermissions()

  const [loadMore, setLoadMore] = React.useState<boolean>(false)
  const [includeAll, setIncludeAll] = React.useState<boolean>(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [selectedRental, setSelectedRental] = React.useState<RentalDataFragment | null>(null)

  const { modalManagerRef } = useModalContext()

  const [returnRental] = useReturnRentalMutation()

  const { data, loading, refetch } = useRentalsPaginatedQuery({
    variables: {
      offset: 0,
      limit: 10,
      includeAll
    }
  })

  const isLoading = React.useMemo(() => loading || loadMore, [loading, loadMore])

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const handleRefetch = async (variables?: Partial<PaginationVariables>) => {
    try {
      setLoadMore(true)

      await refetch(variables)
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    } finally {
      setLoadMore(false)
    }
  }

  const handleOnReturnedConfirm = async (record: RentalDataFragment) => {
    try {
      await returnRental({
        variables: {
          id: record.id
        }
      })
      snackbBarRef.current?.handleSuccessMessage(t('rental.returnSuccess'))
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }
  }

  const handleOnEdit = (record: RentalDataFragment) => {
    setShowEditModal(true)
    setSelectedRental(record)
  }

  const handleOnReturned = (record: RentalDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        handleOnReturnedConfirm(record)
      },
      modalProps: {
        title: t('modal.returnRental.title'),
        children: <Trans
          i18nKey="modal.returnRental.message"
          values={{ title: record.gameUnit?.game.title }}
          components={{
            b: <b />
          }}
        />
      }
    })
  }

  const columns = React.useMemo(() => {
    return [...rentalColumns, {
      ...actionsColumn,
      render: (record) => (
        <ActionsRenderCell
          {...(record.status !== RentalStatus.Returned && can('rental:update') && {
            additionalActions: (
              <RentalRowAdditionalActions
                {...(record.status === RentalStatus.Rented && {
                  onEdit: () => handleOnEdit(record)
                })}
                onReturned={() => handleOnReturned(record)}
              />
            )
          })}
        />
      )
    } as RentalColumn]
  }, [])

  const handleIncludeAllChange = async (variables?: PaginationVariables) => {
    setIncludeAll(!includeAll)

    await handleRefetch({
      ...variables,
      includeAll: !includeAll
    })
  }

  const handleOnRentalUpdated = () => {
    snackbBarRef.current?.handleSuccessMessage(t('rental.updateSuccess'))
  }

  return (
    <Stack
      style={{
        height: '100%'
      }}
      px='24px'
    >
      <Flex
        justify="space-between"

      >
        <Title order={3}>
          {t('routes.rentalList.title')}
        </Title>
      </Flex>

      <BaseDataTable
        fetching={isLoading}
        columns={columns}
        records={data?.rentalsPaginated.nodes || []}
        totalRecords={data?.rentalsPaginated.totalCount || 0}
        pageInfo={data?.rentalsPaginated.pageInfo}
        actionHeaderExtenstion={(variables) => (
          <Checkbox
            disabled={loadMore}
            label={t('rental.includeAll')}
            checked={includeAll}
            onChange={() => handleIncludeAllChange(variables)}
          />
        )}
        refetch={handleRefetch}
        tabelKey="rental-list"
      />

      <UpdateRentalModal
        onSuccess={handleOnRentalUpdated}
        onError={(error) => snackbBarRef.current?.handleErrorMessage(error)}
        opened={showEditModal}
        onClose={() => setShowEditModal(false)}
        rental={selectedRental}
      />

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
