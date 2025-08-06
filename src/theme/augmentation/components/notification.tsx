import { Notification as DefaultNotification } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'

export const Notification = DefaultNotification.extend({
  defaultProps: {
    closeButtonProps: {
      icon: <MaterialIcon icon='close' />
    },
    withBorder: true
  },
  vars: (theme) => ({
    root: {
      '--notification-color': theme.colors.yellow[5]
    }
  }),
  styles: (theme, props) => ({
    root: {
      borderRadius: 0,
      ...(props.withBorder && {
        border: `1px solid ${theme.colors.gray[2]}`
      }),
      '&:before': {
        borderRadius: '100px'
      }
    }
  })
})
