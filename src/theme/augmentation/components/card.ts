import { Card as DefaultCard } from '@mantine/core'

export const Card = DefaultCard.extend({
  defaultProps: {
    classNames: {
      root: 'custom-card'
    }
  },
  styles: (theme) => ({
    root: {
      border: `1px solid ${theme.colors.gray[2]}`,
      borderRadius: 0
    }
  })
})
