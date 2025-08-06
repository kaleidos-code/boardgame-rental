'use client'

import { Box, LoadingOverlay, Title } from '@mantine/core'
import ResponsiveLayoutCard, { ResponsiveLayoutCardHandler } from '@shared/components/ui/ResponsiveLayoutCard'
import { IMPRINT } from '@shared/constants/imprint'
import { TermsType, useTermQuery } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

export type LegalViewProps = {
  type: TermsType | 'imprint'
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const { t } = useTranslation()

  const responsiveLayoutRef = React.useRef<ResponsiveLayoutCardHandler>(null)

  const { data: termsData, loading } = useTermQuery({
    variables: {
      key: type as TermsType
    },
    skip: type === 'imprint'
  })

  const legalContent = React.useMemo(() => {
    switch (type) {
      case 'imprint':
        return {
          title: t('common.imprint'),
          content: IMPRINT
        }
      case TermsType.Privacy:
        return {
          title: t('terms.privacyHeadline'),
          content: termsData?.term.texts.content || ''
        }
      case TermsType.Terms:
        return {
          title: t('terms.termsHeadline'),
          content: termsData?.term.texts.content || ''
        }
      default:
        return {
          title: '',
          content: ''
        }
    }
  }, [type, termsData])

  return (
    <Box
      h='100%'
      pt={24}
    >
      <ResponsiveLayoutCard
        ref={responsiveLayoutRef}
      >
        <Title order={3}>
          {legalContent.title}
        </Title>

        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <ReactMarkdown
          className='custom-markdown'
        >
          {legalContent.content}
        </ReactMarkdown>

      </ResponsiveLayoutCard>
    </Box>
  )
}
