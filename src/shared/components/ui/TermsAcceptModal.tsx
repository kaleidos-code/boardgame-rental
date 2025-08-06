'use client'

import React from 'react'
import { Anchor, Button, Checkbox, Flex, Modal, Stack, Text } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { AcceptTermsMutationOptions, TermsType, useAcceptTermsMutation } from '@typings/graphql'
import { useForm } from '@mantine/form'

export type TermsAcceptModalProps = {
  opened: boolean
  onSuccess: (msg: string) => void
  onError: (error: any) => void
  onClose: () => void
}

type TermsAcceptForm = {
  accepted: boolean
}

type TermsAcceptTransformedForm = (values: TermsAcceptForm) => AcceptTermsMutationOptions['variables']

export const TermsAcceptModal: React.FC<TermsAcceptModalProps> = ({
  opened,
  onSuccess,
  onError,
  onClose
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)

  const [acceptTerms] = useAcceptTermsMutation()

  const { onSubmit, reset, getValues, getInputProps } = useForm<TermsAcceptForm, TermsAcceptTransformedForm>({
    validateInputOnChange: true,
    initialValues: {
      accepted: false
    },
    transformValues: (values: TermsAcceptForm) => {
      return {
        terms: values.accepted ? [TermsType.Privacy, TermsType.Terms] : []
      }
    }
  })

  React.useEffect(() => {
    reset()
  }, [opened])

  const handleOnConfirm = async (value: AcceptTermsMutationOptions['variables']) => {
    setLoading(true)

    try {
      await acceptTerms({
        variables: {
          terms: value?.terms || []
        }
      })

      onSuccess(t('terms.accepted'))
      onClose()
    } catch (error: any) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      centered
      opened={opened}
      title={t('terms.changedTerms')}
      size='lg'
      onClose={onClose}
    >
      <form
        style={{
          height: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit(handleOnConfirm)}
      >
        <Stack
          gap={16}
        >
          <Text>
            {t('terms.changedTermsDescription')}
          </Text>

          <Checkbox
            required
            label={(
              <Trans
                i18nKey="auth.terms"
                components={{
                  privacy: <Anchor
                    size='sm'
                    href='/privacy'
                    target='_blank'
                  />,
                  terms: <Anchor href='/terms' size='sm' target='_blank' />
                }}
              />
          )}
            {...getInputProps('accepted')}
          />

          <Flex
            justify="space-evenly"
            gap={16}
          >
            <Button
              w="100%"
              onClick={onClose}
              variant='outline'
            >
              {t('action.cancel')}
            </Button>
            <Button
              type="submit"
              w="100%"
              loading={loading}
              disabled={!getValues().accepted}
            >
              {t('action.accept')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
