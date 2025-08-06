'use client'

import { Accordion, Box, Title } from '@mantine/core'
import { PickUpDays } from '@shared/components/ui/PickUpDays'
import ResponsiveLayoutCard, { ResponsiveLayoutCardHandler } from '@shared/components/ui/ResponsiveLayoutCard'
import { appConfig } from '@shared/constants/config'
import { usePickUpDaysQuery } from '@typings/graphql'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const FaqView: React.FC = () => {
  const { t } = useTranslation()

  const { data } = usePickUpDaysQuery()

  const responsiveLayoutRef = React.useRef<ResponsiveLayoutCardHandler>(null)

  return (
    <Box
      h='100%'
      pt={24}
    >
      <ResponsiveLayoutCard
        ref={responsiveLayoutRef}
      >
        <Title order={3}>
          {t('routes.faq')}
        </Title>

        {/* <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        /> */}

        <Accordion
          multiple
        >
          <Accordion.Item value="pickUpReturnDays">
            <Accordion.Control>{t('faq.pickUpReturnDays')}</Accordion.Control>
            <Accordion.Panel>
              <PickUpDays
                pickUpDays={data?.pickUpDays || []}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="howManyGames">
            <Accordion.Control>{t('faq.howManyGames.title')}</Accordion.Control>
            <Accordion.Panel>
              <Trans
                i18nKey='faq.howManyGames.description'
                components={{
                  b: <b />
                }}
                values={{
                  countOverall: appConfig.maxGamesTotal,
                  countReservation: appConfig.maxReservationsPerUser,
                  countReservationGames: appConfig.maxGamesPerRenting
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="rentalLength">
            <Accordion.Control>{t('faq.rentalLength.title')}</Accordion.Control>
            <Accordion.Panel>
              <Trans
                i18nKey='faq.rentalLength.description'
                components={{
                  b: <b />
                }}
                values={{
                  days: appConfig.rentingPeriod.replace('d', '')
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="reservationLength">
            <Accordion.Control>{t('faq.reservationLength.title')}</Accordion.Control>
            <Accordion.Panel>
              <Trans
                i18nKey='faq.reservationLength.description'
                components={{
                  b: <b />
                }}
                values={{
                  count: appConfig.pickUpPeriod.replace('w', '')
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

      </ResponsiveLayoutCard>
    </Box>
  )
}
