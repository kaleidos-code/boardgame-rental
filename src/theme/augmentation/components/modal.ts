import { Modal as DefaultModal } from '@mantine/core'

export const Modal = DefaultModal.extend({
  defaultProps: {
    classNames: {
      inner: 'custom-modal-inner',
      content: 'custom-modal-content'
    }
  },
  styles: (theme) => ({
    title: {
      ...theme.headings.sizes.h5
    },
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    inner: {
      zIndex: 1001
    }
  })
})
