import { Box, Text } from '@mantine/core'
import React from 'react'

import { MaterialIcon } from '../../ui/MaterialIcon'

export type PasswordRequirementProps = {
  meets: boolean
  label: string
}

export const PasswortRequirement: React.FC<PasswordRequirementProps> = ({ meets, label }) => {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets
        ? (
          <MaterialIcon icon="check" />
          )
        : (
          <MaterialIcon icon="cancel" />
          )}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  )
}
