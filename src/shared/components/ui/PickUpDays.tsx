import React from 'react'
import { PickUpDayDataFragment } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { formatPickUpDays } from '@utils/format'
import { Grid, Stack, Text } from '@mantine/core'

export type PickUpDaysProps = {
  pickUpDays: PickUpDayDataFragment[]
}

export const PickUpDays: React.FC<PickUpDaysProps> = ({ pickUpDays }) => {
  const { t } = useTranslation()

  const mappedPickUpDays = React.useMemo(() => formatPickUpDays(pickUpDays || []), [pickUpDays])

  return <>
    {mappedPickUpDays.map((day) => (
      <Grid
        key={day.dayOfWeek}
      >
        <Grid.Col
          span={3}
        >
          <Text>
            {`${t(`days.${day.dayOfWeek.toLowerCase()}`)}:`}
          </Text>
        </Grid.Col>
        <Grid.Col
          span={9}
        >
          <Stack
            gap={4}
          >
            {day.pickUpTimes.map((time) => (
              <Text
                key={time}
              >
                {t('common.timePeriodLabel', { period: time })}
              </Text>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    ))}
  </>
}
