import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export type UseResponsive = {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
}

export const useResponsive = (): UseResponsive => {
  const { breakpoints } = useMantineTheme()

  const xs = !!useMediaQuery(`(max-width: ${breakpoints.xs})`)
  const sm = !!useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const md = !!useMediaQuery(`(max-width: ${breakpoints.md})`)
  const lg = !!useMediaQuery(`(max-width: ${breakpoints.lg})`)
  const xl = !!useMediaQuery(`(max-width: ${breakpoints.xl})`)

  return {
    xs,
    sm,
    md,
    lg,
    xl
  }
}
