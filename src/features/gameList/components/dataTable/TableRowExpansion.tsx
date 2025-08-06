import { Badge, Box, Group } from '@mantine/core'
import { SimpleDataRow } from '@shared/components/ui/SimpleDataRow'
import { GameDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RatioImage } from '@shared/components/ui/RatioImage'

type Props = {
  data: {
    record: GameDataFragment
    index: number
    collapse: () => void
  }
}

export const TableRowExpansion: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()

  const { record } = data

  return (
    <Box>
      <SimpleDataRow
        label={t('common.rented')}
        value={t('common.rentedCount', {
          total: record.units.length,
          rented: record.units.filter((unit) => !unit.available).length
        })}
      />
      <SimpleDataRow
        label={t('common.gameTags')}
      >
        <Group
          gap={4}
          align='center'
          style={{
            height: '100%'
          }}
        >
          {record.tags.map((tag) => (
            <Badge
              key={tag.id}
              color='blue.1'
              c='blue.7'
            >
              {tag.texts.name}
            </Badge>
          ))}
        </Group>
      </SimpleDataRow>

      <SimpleDataRow
        label={t('common.description')}
        value={record.texts.description}
      />

      <SimpleDataRow
        label={t('common.contents')}
        value={record.texts.content}
      />

      <SimpleDataRow
        label={t('common.units')}
        noDivider={
          (record.files?.length || 0) === 0
        }
      >
        {record.units.map((unit) => (
          <Box
            key={unit.id}
            bg="gray.0"
            style={{
              padding: '8px',
              opacity: unit.available ? 1 : 0.5,
              marginBottom: '8px'
            }}
          >
            <SimpleDataRow
              noDivider
              label={t('common.gameUnitId')}
              value={unit.prefixedShortId}
            />
            <SimpleDataRow
              noDivider
              label={t('common.complete')}
              value={unit.incomplete ? t('common.no') : t('common.yes')}
            />
            <SimpleDataRow
              noDivider
              label={t('common.weight')}
              value={unit.weight}
            />
            <SimpleDataRow
              noDivider
              label={t('common.missingParts')}
              value={unit.texts.missingParts}
            />
          </Box>
        ))}

      </SimpleDataRow>

      {(record.files?.length || 0) > 0 && (
      <SimpleDataRow
        label={t('common.images')}
      >
        <Group
          gap={4}
          align='center'
          style={{
            height: '100%'
          }}
        >
          {record.files?.map((image) => (
            <RatioImage
              key={image.id}
              src={image.url}
              blurDataURL={image.dataUrl}
              alt={t('alt.coverImage', { title: record.title })}
            />
          ))}
        </Group>
      </SimpleDataRow>
      )}

    </Box>
  )
}
