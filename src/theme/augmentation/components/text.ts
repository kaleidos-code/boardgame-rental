import { Text as DefaultText, Title as DefaultTitle } from '@mantine/core'

export const Text = DefaultText.extend({
  defaultProps: {
    fw: 500,
    size: 'md',
    c: 'gray.8'
  }
})

export const Title = DefaultTitle.extend({
  defaultProps: {
    c: 'gray.9'
  }
})
