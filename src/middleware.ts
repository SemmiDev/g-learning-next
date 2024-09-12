import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { authRoutes, publicRoutes, routes } from './config/routes'

export default withAuth(
  function middleware(req) {
    // sudah login dan mengakses route auth maka redirect ke dashboard
    if (
      Object.values(authRoutes).includes(req.nextUrl.pathname) &&
      !!req.nextauth.token
    ) {
      return NextResponse.redirect(new URL(routes.dashboard, req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const regexTes = /^\/tes\/.+/
        // hanya untuk yg sudah login atau hanya bisa mengakses route publik atau halaman testing
        return (
          !!req.nextUrl.pathname.match(regexTes) ||
          Object.values(publicRoutes).includes(req.nextUrl.pathname) ||
          !!token
        )
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
