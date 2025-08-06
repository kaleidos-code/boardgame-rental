import { Flex, Text } from '@mantine/core'
import React from 'react'
import { MaterialIcon as MaterialIconType } from 'material-icons'

import { MaterialIcon } from './MaterialIcon'

export type CardBadgeProps = React.PropsWithChildren & {
  colorScheme: 'red' | 'blue',
  right?: boolean,
  icon?: MaterialIconType
}

export const CardBadge: React.FC<CardBadgeProps> = ({ colorScheme, icon, right, children }) => {
  const colorProps = React.useMemo(() => {
    switch (colorScheme) {
      case 'red':
        return {
          bg: 'red',
          c: 'white'
        }
      case 'blue':
        return {
          bg: 'blue',
          c: 'white'
        }
      default:
        return {
          bg: 'gray',
          c: 'white'
        }
    }
  }, [colorScheme])

  return (
    <Flex
      bg={colorProps.bg}
      c={colorProps.c}
      gap={4}
      style={{
        position: 'absolute',
        zIndex: 10,
        top: 0,
        ...(right
          ? {
              right: 0,
              borderBottomLeftRadius: 8
            }
          : {
              left: 0,
              borderBottomRightRadius: 8
            }),
        padding: '4px 8px'
      }}
    >
      {icon && (
        <MaterialIcon
          iconProps={{
            fz: 'md',
            c: colorProps.c
          }}
          icon={icon}
        />
      )}
      <Text
        size="xs"
        c={colorProps.c}
      >
        {children}
      </Text>
    </Flex>
  )
}
