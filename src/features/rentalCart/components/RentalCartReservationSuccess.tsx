import { Stack, Title, Text, Box } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { PickUpDayDataFragment, ReservationDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  pickUpDays?: PickUpDayDataFragment[]
  reservation: ReservationDataFragment
}

export const RentalCartReservationSuccess: React.FC<Props> = ({ reservation }) => {
  const { t } = useTranslation()

  return (
    <Stack
      gap={32}
    >
      <Stack
        w='100%'
        gap={16}
        align='center'
      >
        <Box
          w={85}
          h={85}
          bg='green'
          style={{
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MaterialIcon
            iconProps={{
              c: 'white'
            }}
            size='large'
            icon="check"
          />
        </Box>
        <Box
          ta='center'
        >
          <Title order={5}>
            {t('rentalCart.reservationCode')}
          </Title>

          <Title order={1}>
            {reservation.reservationCode}
          </Title>
        </Box>
      </Stack>

      <Stack
        gap={4}
      >
        <Text fw={600}>
          {t('rentalCart.reservationUnitsInfo', { count: reservation.gameUnits.length })}
        </Text>
        {reservation.gameUnits.map((unit) => (
          <Text key={unit.unitShortId}>
            {unit.game.title}
          </Text>
        ))}
      </Stack>

      {/* <Stack
        gap={4}
      >
        <Text>
          {t('rentalCart.reservationDayInfo', { count: pickUpDays?.length })}
        </Text>

        <PickUpDays
          pickUpDays={pickUpDays || []}
        />
      </Stack> */}

      <Text>
        {t('rentalCart.reservationCodeInfo', { count: reservation.gameUnits.length })}
      </Text>
    </Stack>
  )
}
