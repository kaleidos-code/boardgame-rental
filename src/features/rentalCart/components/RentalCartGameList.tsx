import { Stack, Text } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { GameDataFragment } from '@typings/graphql'

import { RentalCartGameListItem } from './RentalCartGameListItem'

type Props = {
  games: GameDataFragment[]
  onRemoveGame: (game: GameDataFragment) => void
}

export const RentalCartGameList: React.FC<Props> = ({ games, onRemoveGame }) => {
  const { t } = useTranslation()

  return (
    <Stack>
      {games.length === 0 && (
      <Text>
        {t('gameLibrary.rentalCartEmpty')}
      </Text>
      )}

      {games.map((game, index) => (
        <RentalCartGameListItem
          key={game.id}
          game={game}
          isLast={index === games.length - 1}
          onRemoveGame={onRemoveGame}
        />
      ))}
    </Stack>
  )
}
