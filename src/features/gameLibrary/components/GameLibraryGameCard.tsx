import { Box, Image, Text, Skeleton, Stack, Title, Button, Anchor } from '@mantine/core'
import { GameDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useIsInCart } from '@hooks/useIsInCart'
import { CardBadge } from '@shared/components/ui/CardBadge'

import { GameLibraryTagStack } from './GameLibraryTagStack'
import { GameLibraryToCartButton } from './GameLibraryToCartButton'

type Props = {
  data?: GameDataFragment
  hideReserveButton?: boolean
  onAddToCart?: (data: GameDataFragment) => void
  onGameInfo?: (data: GameDataFragment) => void
}

export const GameLibraryGameCard: React.FC<Props> = ({ data, onAddToCart, onGameInfo, hideReserveButton }) => {
  const { t } = useTranslation()

  const gameInCart = useIsInCart(data?.id)

  const coverImage = React.useMemo(() => {
    return data?.files?.find((image) => image.key === 'coverImage') || null
  }, [data])

  return (
    <Skeleton
      h="100%"
      visible={!data}
    >
      <Box
        mih={420}
        h="100%"
        bd="1px solid gray.2"
        display="flex"
        style={{
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box
          flex="0 0 auto"
          display="flex"
          bg="gray.1"
          h="220px"
          style={{
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {gameInCart && data?.available && (
            <CardBadge
              colorScheme='blue'
              icon='shopping_cart'
            >
              {t('gameLibrary.alreadyInCart')}
            </CardBadge>
          )}

          <Anchor
            component='button'
            onClick={() => data && onGameInfo?.(data)}
            variant='text'
            style={{
              height: '100%',
              textAlign: 'left'
            }}
          >
            <Image
              h="100%"
              w="auto"
              fit='contain'
              src={coverImage?.url || ''}
              alt={t('alt.coverImage', { title: data?.title || '' })}
              fallbackSrc="/cover_fallback.png"
            />
          </Anchor>
        </Box>
        <Stack
          gap={16}
          flex="1 1 auto"
          px={32}
          py={24}
          bg="#fff"
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Stack
            gap={16}
          >
            {(data?.tags.length || 0) > 0 && (
              <GameLibraryTagStack tags={data?.tags || []} />
            )}

            <Anchor
              component='button'
              onClick={() => data && onGameInfo?.(data)}
              variant='text'
              style={{
                textAlign: 'left'
              }}
            >
              <Title
                order={4}
                c="gray.9"
              >
                {data?.title}
              </Title>
            </Anchor>

            {data?.ean && (
              <Text
                size="xs"
                lineClamp={3}
              >
                { t('gameLibrary.eanWithNumber', { ean: data?.ean })}
              </Text>
            )}

            <Text
              size="xs"
              lineClamp={3}
            >
              {data?.texts.description}
            </Text>
            {!data?.available && (
              <Text
                size="xs"
                c="red.5"
              >
                {t('gameLibrary.notAvailable')}
              </Text>
            )}
            {(data?.incomplete && data?.available) && (
              <Text
                size="xs"
                c="yellow.7"
              >
                {t('gameLibrary.incomplete')}
              </Text>
            )}
          </Stack>

          <Box
            style={{
              display: 'flex',
              gap: 8,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {!hideReserveButton && data && (
              <GameLibraryToCartButton
                data={data}
                onAddToCart={onAddToCart}
              />
            )}
            <Button
              variant='outline'
              onClick={() => data && onGameInfo?.(data)}
            >
              {t('action.moreInfo')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Skeleton>
  )
}
