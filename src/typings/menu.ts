import React from 'react'

export enum MenuActions {
  LOGOUT = 'LOGOUT',
}

export type MenuNavItemType = {
  linkKey: string
  href?: string
  action?: MenuActions
  permissions?: string[]
  public?: boolean
  icon?: React.ReactNode
}

export type MenuNavGroupType = {
  groupKey: string
  hideLabel?: boolean
  children?: MenuNavItemType[]
}
