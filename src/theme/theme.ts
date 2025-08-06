'use client'

import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core'

import { components } from './augmentation/components'
import { colors } from './augmentation/colors'
import { fontSizes, headings } from './augmentation/typography'

const themeOverride = createTheme({
  components,
  primaryColor: 'orange',
  primaryShade: 5,
  headings,
  fontFamily: 'Raleway',
  fontSizes,
  colors
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
