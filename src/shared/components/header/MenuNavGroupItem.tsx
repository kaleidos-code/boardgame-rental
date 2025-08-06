import { Menu } from '@mantine/core'
import { MenuNavItemType } from '@typings/menu'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type MenuNavGroupItemProps = {
  data: MenuNavItemType
  onClick?: () => void
}

export const MenuNavGroupItem: React.FC<MenuNavGroupItemProps> = ({ data, onClick }) => {
  const { t } = useTranslation()

  return (
    <Menu.Item
      component="a"
      onClick={onClick}
      miw={150}
      {...(data.href ? { href: data.href } : {}) }
    >
      {t(`menu.${data.linkKey}`)}
    </Menu.Item>
  )
}
