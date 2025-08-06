import { Input as DefaultInput, InputLabel as DefaultInputLabel } from '@mantine/core'

export const Input = DefaultInput.extend({
  defaultProps: {
    fw: 500
  },
  styles: () => ({
    input: {
      borderRadius: '0'
    }
  })
})

export const InputLabel = DefaultInputLabel.extend({
  defaultProps: {
    fz: '12px',
    fw: 700,
    lh: '18px',
    c: 'gray.7'
  }
})
