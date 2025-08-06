'use client'

import { Anchor, Flex } from '@mantine/core'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { toCamelCase } from '@utils/string'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from './MaterialIcon'

export type BreadCrumbsProps = {
  customBreadcrumbTitle?: Record<string, string>
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ customBreadcrumbTitle }) => {
  const { t } = useTranslation()
  const paths = usePathname()
  const params = useParams()

  const getMappedPath = (path: string): string => {
    const getValueIndex = Object.values(params).findIndex((value) => value === path) ?? -1

    return getValueIndex > -1 ? Object.keys(params)[getValueIndex] : path
  }

  const pathNames = React.useMemo(() => {
    const splitted = paths.split('/').filter(Boolean)

    return splitted.map((path, index) => {
      const i18nKey = splitted.slice(0, index + 1).map((item) => toCamelCase(item)).join('.')

      const mappedPath = getMappedPath(path)
      let mappedName = ''

      if (customBreadcrumbTitle && Object.keys(customBreadcrumbTitle).includes(mappedPath)) {
        mappedName = customBreadcrumbTitle[mappedPath]
      } else {
        const name = t(`routes.${i18nKey}`, { returnObjects: true }) as any
        mappedName = typeof name !== 'string' ? name.title : name
      }

      return {
        path,
        fullPath: `/${splitted.slice(0, index + 1).join('/')}`,
        name: mappedName
      }
    })
  }, [paths, customBreadcrumbTitle])

  const currentPath = React.useMemo(() => {
    return pathNames[pathNames.length - 1]?.path || ''
  }, [pathNames])

  return pathNames.length
    ? (
      <Flex
        align="center"
        py={24}
        px={24}
      >
        <Anchor
          href="/"
          style={{
            display: 'flex',
            textDecoration: 'none!important'
          }}
        >
          <MaterialIcon icon='home' />
        </Anchor>
        {pathNames.map((item, index) => (
          <Flex
            align="center"
            key={index}
          >
            <MaterialIcon size="small" icon='chevron_right' />
            {item.path !== currentPath
              ? (
                <Anchor
                  href={item.fullPath}
                >
                  {item.name}
                </Anchor>
                )
              : item.name}
          </Flex>
        ))}
      </Flex>
      )
    : null
}
