import { Overlay as DefaultOverlay } from '@mantine/core'
import { hexToRgb } from '@utils/color'

export const Overlay = DefaultOverlay.extend({
  vars: (theme) => ({
    root: {
      '--overlay-bg': `rgba(${hexToRgb(theme.colors.gray[0])}, 0.65)`
    }
  })
})
