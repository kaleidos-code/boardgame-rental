import { Box, Flex, Loader, Stack } from '@mantine/core'
import { NoItemsCard } from '@shared/components/ui/NoItemsCard'
import {
  ReservationDataFragment,
  ReservationStatus,
  useCancelReservationMutation,
  useMyReservationsQuery,
  useUpdateReservationMutation
} from '@typings/graphql'
import React from 'react'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { useModalContext, GlobalModalType } from '@shared/provider/ModalProvider'
import { Trans, useTranslation } from 'react-i18next'

import { ReservationListItem } from './ReservationListItem'

export const ReservationList = () => {
  const { t } = useTranslation()
  const { data, loading } = useMyReservationsQuery({
    variables: {
      status: [ReservationStatus.Packed, ReservationStatus.Pending]
    }
  })

  const [updateReservation] = useUpdateReservationMutation({
    update (cache, { data: updated }) {
      if (updated?.updateReservation && !updated.updateReservation.gameUnits.length) {
        cache.evict({
          id: cache.identify({
            __typename: 'Reservation',
            id: updated.updateReservation.id
          })
        })

        cache.gc()
      }
    }
  })

  const [cancelReservation] = useCancelReservationMutation({
    update (cache, { data: canceled }) {
      if (canceled?.cancelReservation) {
        cache.evict({
          id: cache.identify({
            __typename: 'Reservation',
            id: canceled.cancelReservation.id
          })
        })

        cache.gc()
      }
    }
  })

  const { modalManagerRef } = useModalContext()
  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const reservationSuccessCallback = (reservation: ReservationDataFragment) => {
    snackbBarRef.current?.handleSuccessMessage(
      <Trans
        i18nKey='myReservations.reservationCanceled'
        values={{ code: reservation.reservationCode }}
        components={{
          b: <b />
        }}
      />)
  }

  const handleOnDeleteUnitConfirm = async (reservation: ReservationDataFragment, unit: ReservationDataFragment['gameUnits'][0]) => {
    snackbBarRef.current?.handleLoadingMessage(t('myReservations.deletingUnit'))

    try {
      const remainingUnits = reservation.gameUnits.filter((gameUnit) => gameUnit.id !== unit.id).map((gameUnit) => gameUnit.id) || []

      const result = await updateReservation({
        variables: {
          id: reservation.id,
          data: {
            gameIds: remainingUnits
          }
        }
      })

      if (!result.data?.updateReservation.gameUnits.length) {
        reservationSuccessCallback(reservation)
      } else {
        snackbBarRef.current?.handleSuccessMessage(
          <Trans
            i18nKey='myReservations.unitDeleted'
            values={{ title: unit.game.title }}
            components={{
              b: <b />
            }}
          />
        )
      }
    } catch (error: any) {
      snackbBarRef.current?.handleErrorMessage(error)
    }
  }

  const handleOnDeleteUnit = (reservation: ReservationDataFragment, unit: ReservationDataFragment['gameUnits'][0]) => {
    modalManagerRef.current?.showModal(GlobalModalType.DELETE_ENTRY, {
      confirmCallback: () => {
        handleOnDeleteUnitConfirm(reservation, unit)
      },
      modalProps: {
        title: t('modal.deleteUnitReservation.title'),
        children: (
          <Trans
            i18nKey='modal.deleteUnitReservation.message'
            values={{ title: unit.game.title }}
            components={{
              b: <b />
            }}
          />
        )
      }
    })
  }

  const handleOnCancelReservationConfirm = async (reservation: ReservationDataFragment) => {
    snackbBarRef.current?.handleLoadingMessage(t('myReservations.cancelingReservation'))

    try {
      await cancelReservation({
        variables: {
          id: reservation.id
        }
      })

      reservationSuccessCallback(reservation)
    } catch (error: any) {
      snackbBarRef.current?.handleErrorMessage(error)
    }
  }

  const handleOnCancelReservation = (reservation: ReservationDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DELETE_ENTRY, {
      confirmCallback: () => {
        handleOnCancelReservationConfirm(reservation)
      },
      modalProps: {
        title: t('modal.cancelReservation.title'),
        children: (
          <Trans
            i18nKey='modal.cancelReservation.message'
            values={{ code: reservation.reservationCode }}
            components={{
              b: <b />
            }}
          />
        )
      }
    })
  }

  return (
    <Stack
      gap={8}
    >
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{
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
        {!data?.myReservations?.length
          ? (
            <NoItemsCard />
            )
          : (
            <Stack>
              {data?.myReservations?.map((reservation) => (
                <ReservationListItem
                  key={reservation.id}
                  reservation={reservation}
                  onCancelReservation={() => handleOnCancelReservation(reservation)}
                  onDeleteUnit={(unit) => handleOnDeleteUnit(reservation, unit)}
                />
              ))}
            </Stack>
            )}
      </Box>

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
