import { MenuActions, MenuNavGroupType } from '@typings/menu'

export const MENU_ITEMS: MenuNavGroupType[] = [
  {
    groupKey: 'myAccount',
    children: [{
      linkKey: 'profile',
      href: '/profile'
    }]
  },
  {
    groupKey: 'links',
    children: [{
      linkKey: 'gameList',
      href: '/game-list',
      permissions: ['game:read']
    }, {
      linkKey: 'userList',
      href: '/user-list',
      permissions: ['user:read']
    }, {
      linkKey: 'reservationList',
      href: '/reservation-list',
      permissions: ['reservation:read']
    }, {
      linkKey: 'rentalList',
      href: '/rental-list',
      permissions: ['rental:read']
    }, {
      linkKey: 'myRentals',
      href: '/my-rentals',
      permissions: ['rental:read.own']
    }, {
      linkKey: 'myReservations',
      href: '/my-reservations',
      permissions: ['reservation:read.own']
    }, {
      linkKey: 'settings',
      href: '/settings',
      permissions: ['settings:read']
    }, {
      linkKey: 'faq',
      href: '/faq'
    }]
  },
  {
    groupKey: 'general',
    hideLabel: true,
    children: [
      {
        linkKey: 'logout',
        action: MenuActions.LOGOUT
      }]
  }
]
