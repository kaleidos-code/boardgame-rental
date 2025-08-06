import { Group, Menu, UnstyledButton, Avatar, Text } from '@mantine/core'
import React from 'react'
import { MenuActions } from '@typings/menu'
import { signOut } from 'next-auth/react'
import { useAuthSession } from '@hooks/useAuthSession'
import { usePermissions } from '@hooks/usePermissions'
import { useTranslation } from 'react-i18next'

import { MENU_ITEMS } from '../../constants/menu'

import { MenuNavGroup } from './MenuNavGroup'

export const PageHeaderMenu: React.FC = () => {
  const { t } = useTranslation()

  const session = useAuthSession()
  const { can } = usePermissions()

  const sessionUser = session?.user

  const handleOnAction = (action: MenuActions) => {
    switch (action) {
      case MenuActions.LOGOUT:
        signOut({
          redirect: true
        })
        break
      default:
        break
    }
  }

  const filterdMenuItems = React.useMemo(() => {
    return MENU_ITEMS.map((group) => {
      return {
        ...group,
        children: group.children?.filter((subItem) => !subItem.permissions?.length || can(subItem.permissions))
      }
    }).filter((group) => group.children?.length)
  }, [sessionUser])

  return (
    <Menu
      zIndex={1001}
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Text
              display={{
                base: 'none',
                sm: 'block'
              }}
              size="sm"
              fw={700}
            >
              {t('common.fullname', {
                firstname: sessionUser?.firstname,
                lastname: sessionUser?.lastname
              })}
            </Text>
            <Avatar
              radius="xl"
              size={28}
            >
              {sessionUser?.firstname?.[0] || ''}
              {sessionUser?.lastname?.[0] || ''}
            </Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {filterdMenuItems.map((item, index) => (
          <MenuNavGroup
            key={item.groupKey}
            data={item}
            hideDivider={index === filterdMenuItems.length - 1}
            onAction={handleOnAction}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
