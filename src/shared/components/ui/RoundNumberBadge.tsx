import { Box, useMantineTheme } from '@mantine/core'
import React from 'react'

export type RoundNumberBadgeProps = {
  number: number,
  bgColor?: string
  color?: string
}

export const RoundNumberBadge: React.FC<RoundNumberBadgeProps> = ({ number, bgColor, color }) => {
  const { primaryColor } = useMantineTheme()

  return (
    <Box
      bg={bgColor || primaryColor}
      c={color || '#fff'}
      style={{
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        fontSize: '10px',
        lineHeight: '10px',
        top: '3px',
        right: '0px',
        transform: 'translate(100%, -50%)'
      }}
    >
      {number}
    </Box>
  )
}
