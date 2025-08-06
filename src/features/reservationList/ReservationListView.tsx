'use client'

import React from 'react'
import { BaseDataTable } from '@shared/components/dataTable/BaseDataTable'
import {
  ReservationDataFragment,
  ReservationStatus,
  useCreateRentalsByReservationMutation,
  useReservationsPaginatedQuery,
  useSetReservationPackedMutation
} from '@typings/graphql'
import { Flex, Stack, Title, Checkbox } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { ActionsRenderCell } from '@shared/components/dataTable/components/ActionsRenderCell'
import { actionsColumn } from '@shared/components/dataTable/columns/actionsColumn'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PaginationVariables } from '@typings/pagination'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'

import { reservationColumns } from './components/dataTable/reservationColumns'
import { ReservationColumn } from './types/types'
import { ReservationRowAdditionalActions } from './components/dataTable/ReservationRowAdditionalActions'
import { UpdateReservationModal } from './components/UpdateReservationModal'
import { CancelReservationModal } from './components/CancelReservationModal'

export const ReservationListView: React.FC = () => {
  const { t } = useTranslation()

  const [loadMore, setLoadMore] = React.useState<boolean>(false)
  const [includeAll, setIncludeAll] = React.useState<boolean>(false)

  const [selectedReservation, setSelectedReservation] = React.useState<ReservationDataFragment | null>(null)
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false)
  const [showCancelModal, setShowCancelModal] = React.useState<boolean>(false)

  const { modalManagerRef } = useModalContext()

  const [createRentalsByReservationMutation] = useCreateRentalsByReservationMutation({
    update: (cache, { data }) => {
      if (data?.createRentalsByReservation) {
        cache.modify({
          id: cache.identify({
            __typename: 'Reservation',
            id: data.createRentalsByReservation[0].reservationId
          }),
          fields: {
            status: () => ReservationStatus.Completed
          }
        })
      }
    }
  })
  const [setReservationStatus] = useSetReservationPackedMutation()

  const { data, loading, refetch } = useReservationsPaginatedQuery({
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

  const confirmPickup = async (record: ReservationDataFragment) => {
    try {
      await createRentalsByReservationMutation({
        variables: {
          data: {
            reservationId: record.id
          }
        }
      })

      snackbBarRef.current?.handleSuccessMessage(t('reservation.confirmPickupSuccess'))
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }
  }

  const confirmPacked = async (record: ReservationDataFragment) => {
    try {
      await setReservationStatus({
        variables: {
          id: record.id
        }
      })

      snackbBarRef.current?.handleSuccessMessage(t('reservation.confirmPackedSuccess'))
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }
  }

  const handleConfirmPickup = async (record: ReservationDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        confirmPickup(record)
      },
      modalProps: {
        title: t('modal.confirmPickup.title'),
        children: (
          <Trans
            i18nKey='modal.confirmPickup.message'
            values={{ code: record.reservationCode }}
            components={{
              b: <b />
            }}
          />
        )
      }
    })
  }

  const handleConfirmPacked = async (record: ReservationDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        confirmPacked(record)
      },
      modalProps: {
        title: t('modal.confirmPacked.title'),
        children: (
          <Trans
            i18nKey='modal.confirmPacked.message'
            values={{ code: record.reservationCode }}
            components={{
              b: <b />
            }}
          />
        )
      }
    })
  }

  const handleCancelReservation = async (record: ReservationDataFragment) => {
    setSelectedReservation(record)
    setShowCancelModal(true)
  }

  const handleOnEdit = (record: ReservationDataFragment) => {
    setSelectedReservation(record)
    setShowEditModal(true)
  }

  const handleOnReservationUpdated = () => {
    snackbBarRef.current?.handleSuccessMessage(t('reservation.updateSuccess'))
  }

  const columns = React.useMemo(() => {
    return [...reservationColumns, {
      ...actionsColumn,
      render: (record) => (
        <ActionsRenderCell
          {...((record.status === ReservationStatus.Pending || record.status === ReservationStatus.Packed) && {
            additionalActions: (
              <ReservationRowAdditionalActions
                row={record}
                onEdit={() => handleOnEdit(record)}
                onPacked={() => handleConfirmPacked(record)}
                onConfirm={() => handleConfirmPickup(record)}
                onCancel={() => handleCancelReservation(record)}
              />
            )
          })}
        />
      )
    } as ReservationColumn]
  }, [])

  const handleIncludeAllChange = async (variables?: PaginationVariables) => {
    setIncludeAll(!includeAll)

    await handleRefetch({
      ...variables,
      includeAll: !includeAll
    })
  }

  const handleOnReservationCanceled = () => {
    snackbBarRef.current?.handleSuccessMessage(t('reservation.cancelSuccess'))
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
          {t('routes.reservationList.title')}
        </Title>
      </Flex>

      <BaseDataTable
        fetching={isLoading}
        columns={columns}
        records={data?.reservationsPaginated.nodes || []}
        totalRecords={data?.reservationsPaginated.totalCount || 0}
        pageInfo={data?.reservationsPaginated.pageInfo}
        actionHeaderExtenstion={(variables) => (
          <Checkbox
            disabled={loadMore}
            label={t('reservation.includeAll')}
            checked={includeAll}
            onChange={() => handleIncludeAllChange(variables)}
          />
        )}
        refetch={handleRefetch}
        tabelKey="reservation-list"
      />

      <UpdateReservationModal
        onSuccess={handleOnReservationUpdated}
        onError={(error) => snackbBarRef.current?.handleErrorMessage(error)}
        opened={showEditModal}
        onClose={() => setShowEditModal(false)}
        reservation={selectedReservation}
      />

      <CancelReservationModal
        onSuccess={handleOnReservationCanceled}
        onError={(error) => snackbBarRef.current?.handleErrorMessage(error)}
        opened={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        reservation={selectedReservation}
      />

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
