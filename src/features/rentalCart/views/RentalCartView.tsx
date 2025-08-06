'use client'

import { Box, Stack, Title, Text, Flex, Button, LoadingOverlay, Tooltip } from '@mantine/core'
import React from 'react'
import ResponisveLayoutCard from '@shared/components/ui/ResponsiveLayoutCard'
import { Trans, useTranslation } from 'react-i18next'
import { useAppSelector } from '@services/store/store'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { useDispatch } from 'react-redux'
import { clearRentalCart, removeFromRentalCart } from '@services/store/slices/app'
import {
  GameDataFragment,
  ReservationDataFragment,
  TokenType,
  useCreateReservationMutation,
  useGamesByIdsQuery,
  useMeQuery,
  usePickUpDaysQuery
} from '@typings/graphql'
import { MailVerificationWarning } from '@shared/components/ui/MailVerificationWarning'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { appConfig } from '@shared/constants/config'
import { useUnacceptedTerms } from '@hooks/useUnacceptedTerms'
import { TermsAcceptenceWarning } from '@shared/components/ui/TermsAcceptenceWarning'

import { RentalCartGameList } from '../components/RentalCartGameList'
import { RentalCartReservationSuccess } from '../components/RentalCartReservationSuccess'

export const RentalCartView: React.FC = () => {
  const { t } = useTranslation()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { rentalCart } = useAppSelector(({ app }) => app)
  const dispatch = useDispatch()
  const { modalManagerRef } = useModalContext()
  const [createReservation] = useCreateReservationMutation()
  const unacceptableTerms = useUnacceptedTerms()

  const { data: pickUpDays } = usePickUpDaysQuery()

  const { data, loading: meLoading } = useMeQuery()
  const { data: gamesData, loading: gamesLoading, refetch } = useGamesByIdsQuery({
    variables: {
      games: rentalCart.map(game => game.id) || []
    }
  })

  const [reservationLoading, setReservationLoading] = React.useState(false)
  const [reservation, setReservation] = React.useState<ReservationDataFragment>()

  const loading = React.useMemo(() => meLoading || reservationLoading || gamesLoading, [meLoading, reservationLoading, gamesLoading])

  const rentalCartCount = React.useMemo(() => rentalCart.length, [rentalCart])

  const notAvailableGames = React.useMemo(() => {
    return gamesData?.gamesByIds.filter(game => !game.available) || []
  }, [gamesData])

  const showVerificationWarning = React.useMemo(() => {
    if (!data) {
      return false
    }

    return !data?.me?.emailVerified
  }, [data])

  const handleClearCart = () => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        dispatch(clearRentalCart())
      },
      modalProps: {
        title: t('modal.clearCart.title'),
        children: t('modal.clearCart.message')
      }
    })
  }

  const handleOnRemoveGame = (game: GameDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        dispatch(removeFromRentalCart(game.id))
      },
      modalProps: {
        title: t('modal.removeFromCart.title'),
        children: <Trans
          i18nKey='modal.removeFromCart.message'
          values={{ title: game?.title }}
          components={{ b: <b /> }}
        />
      }
    })
  }

  const handleOnMailVerificationSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
  }

  const handleOnMailVerificationError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const toolTipLabel = React.useMemo(() => {
    if (!data?.me?.emailVerified) {
      return t('common.emailNotVerified')
    } else if (unacceptableTerms.length > 0) {
      return t('terms.unacctedTerms')
    } else if (rentalCartCount > appConfig.maxGamesPerRenting) {
      return t('gameLibrary.rentalCartMaxGamesShort')
    } else if (notAvailableGames.length > 0) {
      return t('rentalCart.notAvailableTooltip', { count: notAvailableGames.length })
    }

    return ''
  }, [data, rentalCartCount, notAvailableGames])

  const handleCreateReservationConfirm = async () => {
    setReservationLoading(true)

    try {
      const result = await createReservation({
        variables: {
          games: rentalCart.map(game => ({
            gameId: game.id
          }))
        }
      })

      setReservation(result.data?.createReservation)

      dispatch(clearRentalCart())

      snackbBarRef.current?.handleSuccessMessage(t('rentalCart.reservationSuccess'))
    } catch (error: any) {
      snackbBarRef.current?.handleErrorMessage(error)
    } finally {
      refetch()

      setReservationLoading(false)
    }
  }

  const handleCreateReservation = () => {
    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        handleCreateReservationConfirm()
      },
      modalProps: {
        title: t('modal.createReservation.title'),
        children: t('modal.createReservation.message')
      }
    })
  }

  return (
    <Box
      h='100%'
    >
      <ResponisveLayoutCard>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Stack
          gap={8}
        >
          <Title
            mb={4}
            order={3}
          >
            {reservation ? t('rentalCart.reservationSuccess') : t('rentalCart.title')}
          </Title>

          <Box mb={8}>
            {showVerificationWarning && (
              <MailVerificationWarning
                onSuccess={handleOnMailVerificationSuccess}
                onError={handleOnMailVerificationError}
                type={data?.me?.newMailToken as TokenType}
              />
            )}
            {unacceptableTerms.length > 0 && (
              <TermsAcceptenceWarning />
            )}
          </Box>

          {rentalCartCount > appConfig.maxGamesPerRenting && (
            <Text
              c='red.5'
            >
              {t('gameLibrary.rentalCartMaxGames', {
                count: appConfig.maxGamesPerRenting,
                removeCount: rentalCartCount - appConfig.maxGamesPerRenting
              })}
            </Text>
          )}

          {!reservation
            ? (
              <RentalCartGameList
                games={gamesData?.gamesByIds || []}
                onRemoveGame={handleOnRemoveGame}
              />
              )
            : (
              <RentalCartReservationSuccess
                pickUpDays={pickUpDays?.pickUpDays}
                reservation={reservation}
              />
              )}

          <Flex
            mt={16}
            justify='flex-end'
            gap={8}
          >
            {(rentalCartCount > 0 && !reservation) && (
              <>
                <Button
                  variant='outline'
                  onClick={handleClearCart}
                >
                  {t('action.clearCart')}
                </Button>
                <Tooltip
                  label={toolTipLabel}
                  disabled={rentalCartCount > 0 && data?.me?.emailVerified && notAvailableGames.length === 0 && unacceptableTerms.length === 0}
                >
                  <Button
                    disabled={rentalCartCount > appConfig.maxGamesPerRenting ||
                      !data?.me?.emailVerified || notAvailableGames.length > 0 || unacceptableTerms.length > 0}
                    onClick={handleCreateReservation}
                  >
                    {t('action.rent')}
                  </Button>
                </Tooltip>
              </>
            )}

            {(rentalCartCount === 0 || !!reservation) && (
              <Button
                component="a"
                href='/'
              >
                {t('action.toGameLibrary')}
              </Button>
            )}
          </Flex>
        </Stack>
      </ResponisveLayoutCard>

      <Snackbar ref={snackbBarRef} />
    </Box>
  )
}
