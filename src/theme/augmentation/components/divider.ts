import { Divider as DefaultDivider } from '@mantine/core'

export const Divider = DefaultDivider.extend({
  defaultProps: {
    color: 'gray.2'
  },
  styles: (theme) => ({
    label: {
      color: theme.colors.gray[8],
      fontSize: theme.fontSizes.sm,
      lineHeight: '18px',
      fontWeight: 600
    }
  })
})
