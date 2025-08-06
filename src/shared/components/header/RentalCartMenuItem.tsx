import { ActionIcon, Box, Divider, Flex, Text } from '@mantine/core'
import { GameDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from '../ui/MaterialIcon'
import { NotAvailabeHint } from '../ui/NotAvailabeHint'

type Props = {
  game: GameDataFragment;
  isLast?: boolean;
  onRemove: (game: GameDataFragment) => void;
};

export const RentalCartMenuItem: React.FC<Props> = ({
  game,
  isLast = false,
  onRemove
}) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
      >
        <Box>
          <Text>
            {game.title}
          </Text>

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
        </Box>
        <Flex>
          <ActionIcon
            variant="transparent"
            onClick={() => onRemove(game)}
          >
            <MaterialIcon icon="delete" />
          </ActionIcon>
        </Flex>
      </Flex>

      {!isLast && (
        <Divider my={8}/>
      )}
    </Box>
  )
}
