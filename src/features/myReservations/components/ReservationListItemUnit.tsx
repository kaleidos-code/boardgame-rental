import React from 'react'
import { ReservationDataFragment } from '@typings/graphql'
import { Flex, Text, Image, Box, Stack, Title, Divider, ActionIcon } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'

type Props = {
  gameUnit: ReservationDataFragment['gameUnits'][0],
  onDelete: (id: string) => void
}

export const ReservationListItemUnit: React.FC<Props> = ({ gameUnit, onDelete }) => {
  const coverImage = React.useMemo(() => {
    return gameUnit?.game?.files?.find((file) => file.key === 'cover')?.url || '/cover_fallback.png'
  }, [gameUnit])

  return (
    <Stack
      gap={8}
    >
      <Divider />

      <Flex
        direction={{
          base: 'column',
          sm: 'row'
        }}
        align={{
          base: 'flex-start',
          sm: 'center'
        }}
        gap={16}
      >
        <Flex
          justify="center"
          flex="0 1 auto"
          bg="gray.1"
          h="100px"
          w={{
            base: '100%',
            sm: '100px'
          }}
        >
          <Image
            h="100%"
            w={{
              base: 'auto',
              sm: '100%'
            }}
            fit='cover'
            src={coverImage}
          />
        </Flex>
        <Flex
          flex={1}
          w={{
            base: '100%',
            sm: 'auto'
          }}
          justify="space-between"
        >
          <Box flex={1}>
            <Title order={6}>
              {gameUnit.game.title}
            </Title>
            <Text>
              {gameUnit.game.publisher}
            </Text>
          </Box>
          <Stack
            align='center'
            flex={0}
          >
            <ActionIcon variant='transparent' color='red' onClick={() => onDelete(gameUnit.id)} >
              <MaterialIcon icon='delete' />
            </ActionIcon>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  )
}
