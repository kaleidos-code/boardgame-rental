import React from 'react'
import { RentalDataFragment, RentalStatus } from '@typings/graphql'
import { Card, Flex, Image, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { dateToHumanReadable } from '@utils/format'
import { CardBadge } from '@shared/components/ui/CardBadge'

type Props = {
  rental: RentalDataFragment
}

export const RentalPaginatedListItem: React.FC<Props> = ({ rental }) => {
  const { t, i18n } = useTranslation()

  const coverImage = React.useMemo(() => {
    return rental?.gameUnit?.game?.files?.find((file) => file.key === 'cover')?.url || '/cover_fallback.png'
  }, [rental])

  return (
    <Card
      styles={(theme) => ({
        root: {
          padding: 0,
          ...(rental.status === RentalStatus.Overdue && {
            borderColor: theme.colors.red[5]
          })
        }
      })}
    >
      <Flex
        direction={{
          base: 'column',
          sm: 'row'
        }}
      >
        <Flex
          bg="gray.1"
          h="125px"
          justify={{
            base: 'center',
            sm: 'flex-start'
          }}
          w={{
            base: '100%',
            sm: '175px'
          }}
        >
          {rental.status === RentalStatus.Overdue && (
            <CardBadge
              colorScheme='red'
              right
            >
              {t('common.overDue')}
            </CardBadge>
          )}
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
        <Stack
          p={16}
          gap={4}
        >
          <Flex
            gap={4}
          >
            <Title order={5}>
              {t('common.gameWithUnit', {
                unit: rental.gameUnit?.prefixedShortId,
                title: rental.gameUnit?.game.title
              })}
            </Title>
            <Text>
              {`- ${rental.bookingId}`}
            </Text>
          </Flex>

          <Text>
            {t('common.rentedAt', {
              date: dateToHumanReadable(rental.createdAt, {
                lang: i18n.language
              })
            })}
          </Text>

          <Text>
            {(t('common.returnDate', {
              date:
              dateToHumanReadable(rental.status === RentalStatus.Returned ? rental.returnedAt : rental.dueDate, {
                lang: i18n.language
              })
            }))}
          </Text>
        </Stack>
      </Flex>
    </Card>
  )
}
