import { SimpleDataRow } from '@shared/components/ui/SimpleDataRow'
import { UserDataFragment } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  meData?: UserDataFragment
}

export const PersonalDataList: React.FC<Props> = ({ meData }) => {
  const { t } = useTranslation()

  return (
    <>
      <SimpleDataRow label={t('common.email')} value={meData?.email} />
      <SimpleDataRow label={t('common.firstname')} value={meData?.firstname} />
      <SimpleDataRow label={t('common.lastname')} value={meData?.lastname} />
      <SimpleDataRow label={t('common.street')} value={meData?.street} />
      <SimpleDataRow label={t('common.postalCode')} value={meData?.postalCode} />
      <SimpleDataRow label={t('common.city')} value={meData?.city} />
      <SimpleDataRow label={t('common.telephone')} value={meData?.telephone} />
    </>
  )
}
