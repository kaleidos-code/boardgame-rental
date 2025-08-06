import { MantineTheme } from '@mantine/core'

export const headings: Partial<MantineTheme['headings']> = {
  fontFamily: 'Raleway',
  sizes: {
    h1: {
      fontSize: '40px',
      lineHeight: '48px',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '16px',
      lineHeight: '24px'
    }
  }
}

export const fontSizes: Partial<MantineTheme['fontSizes']> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px'
}
