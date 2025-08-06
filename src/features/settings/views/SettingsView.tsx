'use client'

import React from 'react'
import { Text, Flex, Button, Box, LoadingOverlay, ActionIcon, Stack, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import ResponsiveLayoutCard, { ResponsiveLayoutCardHandler } from '@shared/components/ui/ResponsiveLayoutCard'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { useResponsive } from '@hooks/useResponsive'
import { SimpleDataRow } from '@shared/components/ui/SimpleDataRow'
import { usePickUpDaysQuery } from '@typings/graphql'
import { PickUpDays } from '@shared/components/ui/PickUpDays'

import { SettingsFormRefHandler } from '../types/types'
import UpdateSettingsForm from '../components/UpdateSettingsForm'

export const SettingsView: React.FC = () => {
  const { t } = useTranslation()

  const [showEdit, setShowEdit] = React.useState(false)

  const { data, refetch } = usePickUpDaysQuery()

  const { xs } = useResponsive()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)
  const updateSettingsFormRef = React.useRef<SettingsFormRefHandler>(null)
  const responsiveLayoutRef = React.useRef<ResponsiveLayoutCardHandler>(null)

  const handleChangeEdit = () => {
    if (showEdit) {
      updateSettingsFormRef.current?.closeWithCallback(() => setShowEdit(false))
    } else {
      setShowEdit(true)
    }
  }

  const handleOnUpdateSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
    updateSettingsFormRef.current?.resetForm()

    refetch()

    setShowEdit(false)
  }

  const handleOnUpdateError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  return (
    <Box
      h='100%'
    >
      <ResponsiveLayoutCard
        ref={responsiveLayoutRef}
      >
        <LoadingOverlay
          visible={false}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Flex
          justify='space-between'
        >
          <Box
            flex={1}
          >
            <Title
              mb={4}
              order={3}
            >
              {t('settings.title')}
            </Title>
          </Box>
          <Box flex={0}>
            {xs
              ? (
                <ActionIcon
                  onClick={handleChangeEdit}
                >
                  <MaterialIcon icon={showEdit ? 'close' : 'edit'} />
                </ActionIcon>)
              : (
                <Button
                  leftSection={<MaterialIcon icon={showEdit ? 'close' : 'edit'} />}
                  onClick={handleChangeEdit}
                >
                  {showEdit ? t('action.cancel') : t('action.edit')}
                </Button>
                )
          }
          </Box>
        </Flex>

        <Text>
          {t('settings.description')}
        </Text>

        {showEdit
          ? (
            <UpdateSettingsForm
              ref={updateSettingsFormRef}
              data={data?.pickUpDays || []}
              onSuccess={handleOnUpdateSuccess}
              onError={handleOnUpdateError}
              active={showEdit}
            />
            )
          : (
            <Stack>
              <SimpleDataRow
                noDivider
                label={t('settings.pickUpReturnDays')}
              >
                <PickUpDays
                  pickUpDays={data?.pickUpDays || []}
                />
              </SimpleDataRow>
            </Stack>
            )}
      </ResponsiveLayoutCard>

      <Snackbar ref={snackbBarRef} />
    </Box>
  )
}
