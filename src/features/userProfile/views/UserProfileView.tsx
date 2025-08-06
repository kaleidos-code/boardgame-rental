'use client'

import React from 'react'
import { Text, Flex, Button, Box, LoadingOverlay, ActionIcon, Stack, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import ResponsiveLayoutCard, { ResponsiveLayoutCardHandler } from '@shared/components/ui/ResponsiveLayoutCard'
import { TokenType, useMeQuery } from '@typings/graphql'
import { MailVerificationWarning } from '@shared/components/ui/MailVerificationWarning'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { SimpleDataRow } from '@shared/components/ui/SimpleDataRow'
import { useResponsive } from '@hooks/useResponsive'

import { PersonalDataList } from '../components/PersonalDataList'
import UpdateProfileForm from '../components/UpdateProfileForm'
import PasswordChangeForm from '../components/PasswordChangeForm'
import { ProfileFormRefHandler } from '../types/types'

export const UserProfileView: React.FC = () => {
  const { t } = useTranslation()

  const [showEdit, setShowEdit] = React.useState(false)
  const [showPasswordChange, setShowPasswordChange] = React.useState(false)

  const { xs } = useResponsive()

  const { data, loading } = useMeQuery()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)
  const updateProfileFormRef = React.useRef<ProfileFormRefHandler>(null)
  const passwordChangeFormRef = React.useRef<ProfileFormRefHandler>(null)
  const responsiveLayoutRef = React.useRef<ResponsiveLayoutCardHandler>(null)

  const showVerificationWarning = React.useMemo(() => {
    if (!data) {
      return false
    }

    return !data?.me?.emailVerified && !showEdit
  }, [data, showEdit])

  const handleOnMailVerificationSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
  }

  const handleOnMailVerificationError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const handleChangeEdit = () => {
    if (showEdit) {
      updateProfileFormRef.current?.closeWithCallback(() => setShowEdit(false))
    } else {
      setShowEdit(true)
    }
  }

  const handleOnUpdateSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
    updateProfileFormRef.current?.resetForm()

    setShowEdit(false)
  }

  const handleOnUpdateError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const handleShowPasswordChange = () => {
    if (showPasswordChange) {
      passwordChangeFormRef.current?.closeWithCallback(() => setShowPasswordChange(false))
    } else {
      responsiveLayoutRef.current?.scrollToBottom()
      setShowPasswordChange(true)
    }
  }

  const handlePasswordChangeSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
    setShowPasswordChange(false)
  }

  const handlePasswordChangeError = (error: Error) => {
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
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Flex
          justify='space-between'
        >
          <Box>
            <Title
              mb={4}
              order={3}
            >
              {t('profile.title')}
            </Title>
            <Text>
              {t('profile.description')}
            </Text>
          </Box>
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
                {showEdit ? t('action.cancel') : t('profile.editProfile')}
              </Button>
              )
          }
        </Flex>

        {showVerificationWarning && (
          <Box mt={12} mb={24}>
            <MailVerificationWarning
              onSuccess={handleOnMailVerificationSuccess}
              onError={handleOnMailVerificationError}
              type={data?.me?.newMailToken as TokenType}
            />
          </Box>
        )}

        {showEdit
          ? data?.me && (
            <UpdateProfileForm
              ref={updateProfileFormRef}
              meData={data?.me}
              onSuccess={handleOnUpdateSuccess}
              onError={handleOnUpdateError}
              active={showEdit}
            />
          )
          : (
            <Stack>
              <PersonalDataList
                meData={data?.me}
              />
              <SimpleDataRow
                label={t('common.password')}
                noDivider
                value={showPasswordChange
                  ? (
                    <PasswordChangeForm
                      ref={passwordChangeFormRef}
                      active={showPasswordChange}
                      onSuccess={handlePasswordChangeSuccess}
                      onError={handlePasswordChangeError}
                    />)
                  : '********'
                }
                actions={
                  <ActionIcon
                    onClick={handleShowPasswordChange}
                  >
                    <MaterialIcon icon={showPasswordChange ? 'close' : 'edit'} />
                  </ActionIcon>

                 }
              />
            </Stack>
            )}
      </ResponsiveLayoutCard>

      <Snackbar ref={snackbBarRef} />
    </Box>
  )
}
