import React from 'react'
import { TagDataFragment } from '@typings/graphql'
import { Box, Badge, BadgeProps } from '@mantine/core'

type Props = {
  tags: TagDataFragment[]
  badgeSize?: BadgeProps['size']
}

export const GameLibraryTagStack: React.FC<Props> = ({ tags, badgeSize = 'xs' }) => {
  return (
    <Box
      style={{
        display: 'flex',
        gap: 4,
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          color='blue.1'
          size={badgeSize}
          c='blue.7'
        >
          {tag.texts.name}
        </Badge>
      ))}
    </Box>
  )
}
