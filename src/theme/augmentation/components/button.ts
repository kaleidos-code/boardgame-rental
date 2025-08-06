import { Button as DefaultButton } from '@mantine/core'

export const Button = DefaultButton.extend({
  styles: () => ({
    root: {
      borderRadius: '100px'
    }
  })
})
