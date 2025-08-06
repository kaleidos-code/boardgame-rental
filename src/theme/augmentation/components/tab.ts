import { Tabs as DefaultTabs } from '@mantine/core'

export const Tabs = DefaultTabs.extend({
  defaultProps: {
    classNames: {
      tab: 'custom-tabs-tab',
      list: 'custom-tabs-list'
    }
  },
  styles () {
    return {
      tabLabel: {
        fontWeight: '600'
      }
    }
  }
})
