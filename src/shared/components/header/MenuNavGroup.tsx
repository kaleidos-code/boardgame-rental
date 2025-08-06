import { Menu } from '@mantine/core'
import { MenuActions, MenuNavGroupType } from '@typings/menu'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MenuNavGroupItem } from './MenuNavGroupItem'

export type MenuNavGroupProps = {
  data: MenuNavGroupType,
  onAction?: (action: MenuActions) => void,
  hideDivider?: boolean
}

export const MenuNavGroup: React.FC<MenuNavGroupProps> = ({ data, onAction, hideDivider }) => {
  const { t } = useTranslation()

  const handleOnAction = (action?: MenuActions) => {
    if (!action) return

    onAction?.(action)
  }

  return (
    <>
      {!data.hideLabel && <Menu.Label>{t(`menu.${data.groupKey}`)}</Menu.Label>}
      {data.children?.map((item) => (
        <MenuNavGroupItem
          key={item.linkKey}
          data={item}
          onClick={() => handleOnAction(item.action)}
        />
      ))}
      {!hideDivider && (
        <Menu.Divider />
      )}
    </>
  )
}
