import { Anchor } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from './MaterialIcon'

type BackToLoginButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const BackToLoginButton: React.FC<BackToLoginButtonProps> = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <Anchor
      size="sm"
      ml={4}
      href="/login"
      onClick={onClick}
      title={t('action.backToLogin')}
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        paddingLeft: 20,
        position: 'relative'
      }}
    >
      <MaterialIcon
        icon="arrow_back"
        iconProps={{
          pos: 'absolute',
          fz: '16px',
          left: 0
        }}
      />
      {t('action.backToLogin')}
    </Anchor>
  )
}
