import { Menu, ActionIcon, Indicator, RemoveScroll, Button } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type GameLibraryMobileFilterHandler = {
  open: () => void
  close: () => void
}

type Props = React.PropsWithChildren & {
  activeFilter: number
}

type GameLibraryMobileFilterRenderFn = React.ForwardRefRenderFunction<GameLibraryMobileFilterHandler, Props>

const GameLibraryMobileFilter: GameLibraryMobileFilterRenderFn = ({ activeFilter, children }, ref) => {
  const { t } = useTranslation()

  const [open, setOpen] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false)
  }), [])

  return (
    <Menu
      opened={true}
      zIndex={1001}
      styles={{
        dropdown: {
          position: 'fixed',
          border: 'none',
          pointerEvents: open ? 'all' : 'none',
          opacity: open ? 1 : 0,
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: '24px 12px 24px 12px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <Menu.Target>
        <Indicator
          disabled={activeFilter === 0}
          offset={2}
          label={activeFilter}
          size={16}
        >
          <Button
            variant="outline"
            style={{
              borderRadius: 0
            }}
            h={36}
            onClick={() => setOpen((o) => !o)}
            leftSection={<MaterialIcon icon='filter_list' />}
          >
            {t('action.filter')}
          </Button>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        <RemoveScroll
          enabled={open}
          style={{
            height: '100%'
          }}
        >
          <ActionIcon
            style={{
              position: 'absolute',
              top: 44,
              right: 30,
              zIndex: 1
            }}
            onClick={() => setOpen((o) => !o)}
            variant="transparent"
          >
            <MaterialIcon icon='close' />
          </ActionIcon>

          {children}
        </RemoveScroll>
      </Menu.Dropdown>
    </Menu>
  )
}

export default React.forwardRef(GameLibraryMobileFilter)
