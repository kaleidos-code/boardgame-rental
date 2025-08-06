import React from 'react'
import { MaterialIcon as MaterialIconType } from 'material-icons'
import { Box, BoxProps } from '@mantine/core'

type Props = {
  icon: MaterialIconType
  size?: 'small' | 'medium' | 'large'
  variant?: 'standard' | 'outlined' | 'round' | 'sharp' | 'two-tone'
  iconProps?: BoxProps
}

export const MaterialIcon: React.FC<Props> = ({ icon, size = 'medium', variant = 'outlined', iconProps }) => {
  const { style, className, ...rest } = iconProps || {}

  const iconVariant = React.useMemo(() => {
    if (variant === 'standard') {
      return 'material-icons'
    } else {
      return `material-icons-${variant}`
    }
  }, [variant])

  const iconSize = React.useMemo(() => {
    if (size === 'small') {
      return '16px'
    } else if (size === 'medium') {
      return '24px'
    } else {
      return '48px'
    }
  }, [size])

  return (
    <Box
      {...rest}
      style={{ fontSize: iconSize, ...style }}
      className={`${iconVariant} ${className}`}
    >
      {icon}
    </Box>
  )
}
