import { Accordion as DefaultAccordion } from '@mantine/core'

export const Accordion = DefaultAccordion.extend({
  styles (theme) {
    return {
      item: {
        border: 'none'
      },
      control: {
        padding: '0',
        backgroundColor: 'transparent!important',
        borderBottom: '1px solid',
        borderColor: theme.colors.gray[2]
      },
      label: {
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        lineHeight: theme.lineHeights.md,
        color: theme.colors.gray[7],
        paddingTop: '8px',
        paddingBottom: '8px'
      },
      content: {
        padding: '0',
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
  }
})
