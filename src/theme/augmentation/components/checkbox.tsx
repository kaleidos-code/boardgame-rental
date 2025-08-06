import React from 'react'
import { Checkbox as DefaultCheckbox } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'

export const Checkbox = DefaultCheckbox.extend({
  defaultProps: {
    icon: ({ className }) => <MaterialIcon
      icon='check'
      size='small'
      iconProps={{ className }}
    />,
    classNames: {
      input: 'custom-checkbox-input',
      icon: 'custom-checkbox-icon'
    }
  },
  styles () {
    return {
      label: {
        cursor: 'pointer'
      },
      input: {
        cursor: 'pointer'
      }
    }
  }
})
