import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

import { JWTTokenExtended } from './typings/common'

const ROLE_ROUTES: Record<string, string[]> = {
  admin: ['/game-list/*', '/user-list/*', '/reservation-list/*', '/rental-list/*', '/settings/*'],
  renter: ['/game-list', '/reservation-list/*', '/rental-list/*'],
  user: ['/rental-cart', '/my-rentals', '/my-reservations']
}

const AUTH_ROUTES = ['/profile/*']

function hasAccess (role: string, path: string) {
  const routes = ROLE_ROUTES[role]

  if (!routes) {
    return false
  }

  const roleRoutes = routes.some(route => {
    if (route.endsWith('/*')) {
      return path.startsWith(route.slice(0, -2))
    } else {
      return path === route
    }
  })

  if (roleRoutes) {
    return true
  }

  return AUTH_ROUTES.some(route => {
    if (route.endsWith('/*')) {
      return path.startsWith(route.slice(0, -2))
    } else {
      return path === route
    }
  })
}

export default withAuth(
  async function middleware (req) {
    const token = req.nextauth.token as JWTTokenExtended
    const { pathname } = new URL(req.url)

    const role = token?.user?.role

    if (role && hasAccess(role.key, pathname)) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/no-access', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login'
    }
  }
)

export const config = {
  matcher: [
    '/game-list/:path*',
    '/user-list/:path*',
    '/profile/:path*',
    '/reservation-list/:path*',
    '/rental-list/:path*',
    '/rental-cart/:path*',
    '/my-rentals/:path*',
    '/my-reservations/:path*'
  ]
}
