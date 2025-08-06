'use client'

import { Button, Text, Tooltip, Indicator, Menu, Box, Stack, Flex, Title, RemoveScroll } from '@mantine/core'
import React from 'react'
import { useAppSelector } from '@services/store/store'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { clearRentalCart, removeFromRentalCart } from '@services/store/slices/app'
import { useGamesByIdsQuery } from '@typings/graphql'
import { useResponsive } from '@hooks/useResponsive'

import { MaterialIcon } from '../ui/MaterialIcon'
import { GlobalModalType, useModalContext } from '../../provider/ModalProvider'
import { appConfig } from '../../constants/config'

import { RentalCartMenuItem } from './RentalCartMenuItem'

export const RentalCartMenu: React.FC = () => {
  const { t } = useTranslation()

  const { xs } = useResponsive()

  const [modalOpen, setModalOpen] = React.useState(false)

  const { rentalCart } = useAppSelector(({ app }) => app)
  const dispatch = useDispatch()
  const { modalManagerRef } = useModalContext()

  const { data: gamesData } = useGamesByIdsQuery({
    variables: {
      games: rentalCart?.map(game => game.id) || []
    }
  })

  const rentalCartCount = React.useMemo(() => rentalCart?.length, [rentalCart])

  const notAvailableGames = React.useMemo(() => {
    return gamesData?.gamesByIds.filter(game => !game.available) || []
  }, [gamesData])

  const handleClearCart = () => {
    setModalOpen(true)

    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        dispatch(clearRentalCart())
        setModalOpen(false)
      },
      cancelCallback: () => {
        setModalOpen(false)
      },
      modalProps: {
        title: t('modal.clearCart.title'),
        children: t('modal.clearCart.message')
      }
    })
  }

  const handleOnRemoveGame = (id: string) => {
    const game = rentalCart.find((item) => item.id === id)

    setModalOpen(true)

    modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
      confirmCallback: () => {
        dispatch(removeFromRentalCart(id))
        setModalOpen(false)
      },
      cancelCallback: () => {
        setModalOpen(false)
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

  return (
    <Menu
      zIndex={2}
      closeOnClickOutside={!modalOpen}
      withinPortal={false}
      styles={{
        dropdown: {
          ...(xs && {
            left: 0,
            right: 0
          })
        }
      }}
    >
      <Indicator
        disabled={!rentalCartCount}
        offset={5}
        label={rentalCartCount}
        size={16}
      >
        <Menu.Target>
          <Button
            {...(xs && {
              size: 'xs'
            })}
            variant='outline'
          >
            <MaterialIcon icon='shopping_cart' />
          </Button>
        </Menu.Target>
      </Indicator>

      <Menu.Dropdown
        w={xs ? '100%' : 400}
      >
        <RemoveScroll >
          <Stack
            gap={8}
            p={16}
          >
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

            <Title
              order={5}
            >
              {t('common.rentalCart')}
            </Title>

            {rentalCartCount === 0 &&
            (
              <Text>
                {t('gameLibrary.rentalCartEmpty')}
              </Text>
            )
            }
            <Box
              mah={500}
              style={{
                overflowY: 'auto'
              }}
            >
              {gamesData?.gamesByIds.map((game, index) => (
                <RentalCartMenuItem
                  key={game.id}
                  game={game}
                  isLast={index === rentalCart.length - 1}
                  onRemove={() => handleOnRemoveGame(game.id)}
                />
              ))}
            </Box>

            <Flex
              gap={8}
              justify="space-evenly"
            >
              <Button
                w='100%'
                variant='outline'
                onClick={handleClearCart}
                disabled={!rentalCartCount}
              >
                {t('action.clear')}
              </Button>
              <Tooltip
                maw={400}
                style={{
                  whiteSpace: 'normal'
                }}
                withinPortal={false}
                label={notAvailableGames.length > 0
                  ? t('rentalCart.notAvailableTooltip', { count: notAvailableGames.length })
                  : t('gameLibrary.rentalCartMaxGames', {
                    count: appConfig.maxGamesPerRenting,
                    removeCount: rentalCartCount - appConfig.maxGamesPerRenting
                  })}
                disabled={rentalCartCount <= appConfig.maxGamesPerRenting && notAvailableGames.length === 0}
              >
                <Box
                  w='100%'
                  style={{
                    ...((rentalCartCount > appConfig.maxGamesPerRenting || notAvailableGames.length > 0) && {
                      cursor: 'not-allowed'
                    })
                  }}
                >
                  <Button
                    component="a"
                    href='/rental-cart'
                    w='100%'
                    style={{
                      ...((rentalCartCount > appConfig.maxGamesPerRenting || notAvailableGames.length > 0) && {
                        pointerEvents: 'none'
                      })
                    }}
                    disabled={rentalCartCount > appConfig.maxGamesPerRenting || !rentalCartCount || notAvailableGames.length > 0}
                  >
                    {t('action.rent')}
                  </Button>
                </Box>
              </Tooltip>
            </Flex>
          </Stack>
        </RemoveScroll>
      </Menu.Dropdown>
    </Menu>
  )
}
