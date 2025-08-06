import { Grid, NumberInput } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTagsQuery } from '@typings/graphql'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { BaseTextarea } from '@shared/components/inputs/BaseTextarea'
import BaseFileInput from '@shared/components/inputs/file/BaseFileInput'
import { EAN_LENGTH } from '@shared/constants/input'

import { useGameFormContext } from '../provider/GameFormProvider'

import { GameUnitInput } from './GameUnitInput'

export const CreateUpdateFormInputs: React.FC = () => {
  const { t } = useTranslation()

  const { data } = useTagsQuery()

  const mappedTags = React.useMemo(() => {
    return data?.tags.map((tag) => {
      return {
        id: tag.id,
        label: tag.texts.name as string
      }
    }) || []
  }, [data])

  const { getInputProps } = useGameFormContext()

  return (
    <>
      <BaseTextInput
        label={t('common.ean')}
        maxLength={EAN_LENGTH}
        {...getInputProps('ean')}
      />

      <BaseTextInput
        label={t('common.title')}
        required
        {...getInputProps('title')}
      />

      <BaseTextarea
        label={t('common.description')}
        required
        resize="vertical"
        {...getInputProps('texts.description')}
      />

      <BaseTextInput
        label={t('common.publisher')}
        required
        {...getInputProps('publisher')}
      />

      <Grid>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.minAge')}
            required
            {...getInputProps('minAge')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.maxAge')}
            required
            {...getInputProps('maxAge')}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.minPlayers')}
            required
            {...getInputProps('minPlayers')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.maxPlayers')}
            required
            {...getInputProps('maxPlayers')}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.minDuration')}
            required
            {...getInputProps('minDuration')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label={t('common.maxDuration')}
            {...getInputProps('maxDuration')}
          />
        </Grid.Col>
      </Grid>

      <GameUnitInput />

      <BaseTextarea
        label={t('common.contents')}
        resize="vertical"
        {...getInputProps('texts.content')}
      />

      <BaseSelectInput
        label={t('common.gameTags')}
        placeholder={t('common.gameTagsPlaceholder')}
        multiple
        options={mappedTags}
        {...getInputProps('tags')}
      />

      <BaseFileInput
        fileKey='coverImage'
        label={t('common.coverImage')}
        {...getInputProps('coverImage')}
      />

      <BaseFileInput
        fileKey='images'
        label={t('common.images')}
        multiple
        {...getInputProps('images')}
      />
    </>
  )
}
