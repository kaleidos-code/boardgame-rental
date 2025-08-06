import { Stack, Flex, Text, Title, Image, Button, Divider } from '@mantine/core'
import { GameDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NotAvailabeHint } from '@shared/components/ui/NotAvailabeHint'

type Props = {
  game: GameDataFragment
  isLast?: boolean
  onRemoveGame: (game: GameDataFragment) => void
}

export const RentalCartGameListItem: React.FC<Props> = ({ game, isLast, onRemoveGame }) => {
  const { t } = useTranslation()

  const coverImage = React.useMemo(() => {
    return game?.files?.find((image) => image.key === 'coverImage') || null
  }, [game])

  return (
    <Stack gap={8}>
      {!game.available && (
        <NotAvailabeHint />
      )}

      {(game?.incomplete && game?.available) && (
        <Text
          size="xs"
          c="yellow.7"
        >
          {t('gameLibrary.incomplete')}
        </Text>
      )}
      <Flex
        direction={{
          base: 'column',
          sm: 'row'
        }}
        gap={{
          base: 4,
          sm: 16
        }}
      >
        <Flex
          flex={1}
          gap={16}
        >
          <Image
            h="100px"
            w={{
              base: '100px',
              sm: '120px',
              md: '150px'
            }}
            fit='cover'
            src={coverImage?.url || ''}
            fallbackSrc="/cover_fallback.png"
          />
          <Stack
            flex={1}
            gap={4}
          >
            <Title
              order={4}
            >
              {game.title}
            </Title>
            <Text
              lineClamp={2}
            >
              {game.texts?.description || ''}
            </Text>
          </Stack>
        </Flex>
        <Flex
          h="auto"
          flex={0}
          justify='flex-end'
          align='flex-end'
        >
          <Button
            size='xs'
            variant='transparent'
            onClick={() => onRemoveGame(game)}
            style={{
              padding: '0'
            }}
          >
            <Text
              c='blue.5'
              fz="sm"
            >
              {t('action.delete')}
            </Text>
          </Button>
        </Flex>
      </Flex>

      {!isLast && (
        <Divider
          mt={{
            base: 0,
            sm: 16
          }}
        />
      )}
    </Stack>
  )
}
