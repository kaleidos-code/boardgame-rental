import { Tooltip, ActionIcon } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onInvite: () => void
  invited: boolean
}

export const UserRowAdditionalActions: React.FC<Props> = ({ onInvite, invited }) => {
  const { t } = useTranslation()

  return (
    <Tooltip label={t(invited ? 'action.sendOptInAgain' : 'action.sendOptIn')}>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={onInvite}
      >
        <MaterialIcon icon={invited ? 'drafts' : 'mail'} />
      </ActionIcon>
    </Tooltip>
  )
}
