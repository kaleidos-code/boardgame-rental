import { Pagination as DefaultPagination } from '@mantine/core'

export const Pagination = DefaultPagination.extend({
  vars: (theme) => ({
    root: {
      '--pagination-active-bg': theme.colors.blue[5],
      '--pagination-active-color': theme.white,
      '--pagination-control-radius': '50%'
    }
  }),
  classNames: {
    control: 'custom-pagination-control'
  }
})
