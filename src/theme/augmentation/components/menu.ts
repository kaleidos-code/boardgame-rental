import { Menu as DefaultMenu } from '@mantine/core'

export const Menu = DefaultMenu.extend({
  styles: () => ({
    dropdown: {
      borderRadius: 0
    }
  })
})
