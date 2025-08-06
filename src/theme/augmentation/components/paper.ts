import { Paper as DefaultPaper } from '@mantine/core'

export const Paper = DefaultPaper.extend({
  styles () {
    return {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
        borderColor: '#000000'
      }
    }
  }
})
