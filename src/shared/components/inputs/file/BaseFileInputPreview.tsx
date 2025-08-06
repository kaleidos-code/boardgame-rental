import { Image, Text, Group, Box, ActionIcon, useMantineTheme } from '@mantine/core'
import { EditableFile } from '@typings/file'
import { convertBytesToHumanReadable } from '@utils/format'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from '../../ui/MaterialIcon'

export type BaseFileInputPreviewProps = {
  onDelete?: () => void
  data: EditableFile
}

export const BaseFileInputPreview: React.FC<BaseFileInputPreviewProps> = ({ data, onDelete }) => {
  const { t } = useTranslation()

  const { colors } = useMantineTheme()

  const isImage = React.useMemo(() => data.mimeType.startsWith('image') || data.upload?.type.startsWith('image'), [data])

  return (
    <Group
      h={75}
      style={{
        borderRadius: 4,
        padding: 8,
        border: '1px solid',
        borderColor: colors.gray[4]
      }}
    >
      {isImage && (
        <Image
          h="100%"
          w="auto"
          fit='cover'
          alt={t('alt.coverImage', { title: data.fileName })}
          src={data.url || ''}
        />
      )}
      <Box flex="1">
        <Text>
          {data.fileName}
        </Text>

        <Text
          size='sm'
          c='gray.6'
        >
          {t('common.fileSize', {
            size: convertBytesToHumanReadable(data.size)
          })}
        </Text>
      </Box>
      <Group>
        <ActionIcon
          onClick={onDelete}
        >
          <MaterialIcon icon="delete" />
        </ActionIcon>
      </Group>
    </Group>
  )
}
