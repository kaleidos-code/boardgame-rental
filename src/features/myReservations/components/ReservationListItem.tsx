import React from 'react'
import { ReservationDataFragment } from '@typings/graphql'
import { Card, Flex, Stack, Text, Title, Button, Box, Divider } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { convertToSeconds, dateToHumanReadable } from '@utils/format'
import { CardBadge } from '@shared/components/ui/CardBadge'
import { appConfig } from '@shared/constants/config'
import { ReservationStatus } from '@prisma/client'

import { ReservationListItemUnit } from './ReservationListItemUnit'

type Props = {
  reservation: ReservationDataFragment,
  onCancelReservation: () => void
  onDeleteUnit: (unit: ReservationDataFragment['gameUnits'][0]) => void
}

export const ReservationListItem: React.FC<Props> = ({ reservation, onCancelReservation, onDeleteUnit }) => {
  const { t, i18n } = useTranslation()

  const pickUpDateLatest = React.useMemo(() => {
    const pickUpPeriodInSeconds = convertToSeconds(appConfig.pickUpPeriod)
    const createdAtDate = new Date(reservation.createdAt)
    const overDueDate = new Date(createdAtDate.getTime() + pickUpPeriodInSeconds * 1000)

    return dateToHumanReadable(overDueDate, {
      lang: i18n.language
    })
  }, [reservation])

  return (
    <Card
      styles={(theme) => ({
        root: {
          padding: 0,
          ...(reservation.overDue && {
            borderColor: theme.colors.red[5]
          })
        }
      })}
    >

      {reservation.overDue && (
        <CardBadge
          colorScheme='red'
        >
          {t('common.overDue')}
        </CardBadge>
      )}
      {reservation.status === ReservationStatus.PACKED && (
        <CardBadge
          colorScheme='blue'
          right
        >
          {t('common.packed')}
        </CardBadge>
      )}
      <Stack
        py={reservation.overDue ? 28 : 16}
        pb={16}
        px={16}
        gap={12}
      >
        <Box>
          <Title order={5}>
            {t('common.reservationCodeWithCode', {
              code: reservation.reservationCode
            })}
          </Title>

          <Text>
            {t('common.reservedAt', {
              date: dateToHumanReadable(reservation.createdAt, {
                lang: i18n.language
              })
            })}
          </Text>
          <Text>
            {t('common.pickUpTill', {
              date: pickUpDateLatest
            })}
          </Text>
        </Box>
        <Stack
          gap={8}
        >
          {reservation.gameUnits.map((gameUnit) => (
            <ReservationListItemUnit
              key={gameUnit.id}
              onDelete={() => onDeleteUnit(gameUnit)}
              gameUnit={gameUnit}
            />
          ))}
        </Stack>
        <Divider mt={16}/>
        <Flex>
          <Button
            size='xs'
            variant='transparent'
            onClick={onCancelReservation}
            style={{
              padding: '0'
            }}
          >
            <Text
              c='blue.5'
              fz="sm"
            >
              {t('action.cancelReservation')}
            </Text>
          </Button>
        </Flex>
      </Stack>
    </Card>
  )
}
