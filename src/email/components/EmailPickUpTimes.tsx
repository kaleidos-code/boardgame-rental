import React from 'react'
import { PickUpDayDataFragment } from '@typings/graphql'
import { formatPickUpDays } from '@utils/format'
import { i18n } from 'i18next'

type Props = {
  i18next: i18n
  pickUpDays?: PickUpDayDataFragment[]
}

export const EmailPickUpTimes: React.FC<Props> = ({ pickUpDays, i18next }) => {
  const { t } = i18next

  const mappedPickUpDays = pickUpDays ? formatPickUpDays(pickUpDays) : []

  return (
    <table
      style={{ fontSize: '14px' }}
    >
      {mappedPickUpDays.map((day) => (
        <tr
          style={{
            verticalAlign: 'top'
          }}
          key={day.dayOfWeek}
        >
          <td>
            <strong>
              {t(`days.${day.dayOfWeek.toLowerCase()}`)}:
            </strong>
          </td>
          <td>
            {day.pickUpTimes.map((time) => (
              <span
                key={time}
              >
                {t('common.timePeriodLabel', { period: time })}
                <br/>
              </span>
            ))}
          </td>
        </tr>
      ))}
    </table>
  )
}
