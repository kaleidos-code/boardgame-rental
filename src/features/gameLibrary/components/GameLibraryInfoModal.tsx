import { Box, Flex, Modal, ModalProps, Stack, Text /** useMantineTheme**/ } from '@mantine/core'
import { ImageCarousel } from '@shared/components/ui/ImageCarousel'
import { GameDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SimpleDataRow } from '@shared/components/ui/SimpleDataRow'
import { dateToHumanReadable } from '@utils/format'
import { useIsInCart } from '@hooks/useIsInCart'
import { CardBadge } from '@shared/components/ui/CardBadge'
import { useResponsive } from '@hooks/useResponsive'

import { GameLibraryTagStack } from './GameLibraryTagStack'
import { GameLibraryToCartButton } from './GameLibraryToCartButton'

type Props = ModalProps & {
  game: GameDataFragment | null
  hideReserveButton?: boolean
  onClose: () => void
  onAddToCart?: (data: GameDataFragment) => void
}

export const GameLibraryInfoModal: React.FC<Props> = ({ game, hideReserveButton, onAddToCart, onClose, ...props }) => {
  const { t, i18n } = useTranslation()

  // const { headings } = useMantineTheme()

  const { xs, sm, md, lg, xl } = useResponsive()

  const gameInCart = useIsInCart(game?.id)

  const parsedPlayers = React.useMemo(() => {
    if (game?.minPlayers && game?.maxPlayers) {
      return `${game.minPlayers} - ${game.maxPlayers}`
    } else if (game?.minPlayers) {
      return `${game.minPlayers}`
    } else if (game?.maxPlayers) {
      return t('common.upTo', { count: game.maxPlayers })
    } else {
      return '-'
    }
  }, [game])

  const parsedDuration = React.useMemo(() => {
    if (game?.minDuration && game?.maxDuration) {
      return t('common.durationSpan', { min: game.minDuration, max: game.maxDuration })
    } else if (game?.minDuration) {
      return t('common.durationMin', { count: game.minDuration })
    } else if (game?.maxDuration) {
      return t('common.durationMax', { count: game.maxDuration })
    } else {
      return '-'
    }
  }, [game])

  const parsedAge = React.useMemo(() => {
    if (game?.minAge && game?.maxAge) {
      return `${game.minAge} - ${game.maxAge}`
    } else if (game?.minAge) {
      return `${game.minAge}+`
    } else if (game?.maxAge) {
      return t('common.upTo', { count: game.maxAge })
    } else {
      return '-'
    }
  }, [game])

  const modalSize = React.useMemo(() => {
    if (xl) {
      return '95%'
    } else if (lg) {
      return '95%'
    } else if (md) {
      return '95%'
    } else if (sm) {
      return '100%'
    } else if (xs) {
      return '100%'
    } else {
      return '70%'
    }
  }, [xs, sm, md, lg, xl])

  const inStock = React.useMemo(() => game?.units.filter((unit) => unit.inStock).length, [game])

  return (
    <Modal
      centered
      onClose={onClose}
      size={modalSize}
      styles={{
        content: {
          // flex: '1 1 auto'
        }
        // title: {
        //   ...headings.sizes.h3
        // }
      }}
      title={game?.title}
      {...props}
    >
      <Flex
        direction={{
          base: 'column',
          md: 'row'
        }}
        align={{
          xs: 'center',
          sm: 'center',
          base: 'flex-start'
        }}
        gap={32}
      >
        <Stack
          justify='center'
          flex={0}
          {...!xs && !sm && !md && { maw: '400px' }}
          w="100%"
          bg="gray.1"
          h="auto"
          style={{
            position: 'relative'
          }}
        >
          {gameInCart && game?.available && (
          <CardBadge
            colorScheme='blue'
            icon='shopping_cart'
          >
            {t('gameLibrary.alreadyInCart')}
          </CardBadge>
          )}
          <ImageCarousel
            title={game?.title || ''}
            height={300}
            indicatorOffset={-40}
            images={game?.files || []}
            fallback="/cover_fallback.png"
          />
        </Stack>

        <Stack
          flex={1}
          gap={16}
        >
          <GameLibraryTagStack
            tags={game?.tags || []}
            badgeSize='md'
          />

          <Text>
            {game?.texts.description}
          </Text>

          {!game?.available && (
          <Text
            c="red.5"
          >
            {t('gameLibrary.notAvailable')}
          </Text>
          )}

          {(game?.incomplete && game?.available) && (
          <Text
            c="yellow.7"
          >
            {t('gameLibrary.incomplete')}
          </Text>
          )}

          <Box>
            {(inStock || 0) > 0 && (
              <SimpleDataRow
                label={t('common.rented')}
              >
                <Flex
                  gap={8}
                >
                  <Text
                    c={!game?.available ? 'red.5' : 'green.6'}
                  >
                    {t('common.rentedCount', {
                      total: inStock,
                      rented: game?.units.filter((unit) => !unit.available).length
                    })}
                  </Text>
                  <Text
                    c={!game?.available ? 'red.5' : 'green.6'}
                  >
                    {game?.available || !game?.availableAt
                      ? ''
                      : `(${t('gameLibrary.availableAgain', {
                date: dateToHumanReadable(game?.availableAt, {
                  lang: i18n.language
                })
            })})`}
                  </Text>
                </Flex>
              </SimpleDataRow>
            )}

            <SimpleDataRow
              label={t('common.ean')}
              value={game?.ean || '-'}
            />

            <SimpleDataRow
              label={t('common.age')}
              value={parsedAge}
            />

            <SimpleDataRow
              label={t('common.playerCount')}
              value={parsedPlayers}
            />

            <SimpleDataRow
              label={t('common.duration')}
              value={parsedDuration}
            />

            <SimpleDataRow
              label={t('common.publisher')}
              value={game?.publisher || '-'}
            />

            <SimpleDataRow
              label={t('common.contents')}
            >
              {game?.texts.content
                ? (
                    game.texts.content.split(',').map((line: any, index: number) => (
                      <Text
                        key={`${game.id}-content-${index}`}
                      >
                        {line}
                      </Text>
                    ))
                  )
                : <Text>-</Text>
              }
            </SimpleDataRow>
          </Box>
        </Stack>
      </Flex>

      <Flex
        justify='flex-end'
      >
        {!hideReserveButton && game && (
        <GameLibraryToCartButton
          data={game}
          onAddToCart={onAddToCart}
        />
        )}
      </Flex>
    </Modal>
  )
}
