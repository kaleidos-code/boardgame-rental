import { Tooltip as DefaultTooltip } from '@mantine/core'

export const Tooltip = DefaultTooltip.extend({
  vars: () => ({
    tooltip: {
      '--tooltip-radius': '0',
      '--tooltip-bg': 'rgba(0, 0, 0, 0.85)'
    }
  })
})
