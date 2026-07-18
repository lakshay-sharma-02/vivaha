import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const publicRoutes = new Set([
  '/', '/login', '/register', '/forgot-password', '/reset-password',
  '/auth/callback', '/premium', '/matches', '/success-stories',
])

const authRoutes = new Set(['/login', '/register', '/forgot-password', '/reset-password'])

const protectedRoutePrefixes = ['/dashboard', '/apply', '/credentials']

function isProtected(pathname: string): boolean {
  if (publicRoutes.has(pathname)) return false
  return protectedRoutePrefixes.some(p => pathname.startsWith(p))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const isAuthed = !!user

  // Redirect authed users away from auth pages
  if (isAuthed && authRoutes.has(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthed users away from protected pages
  if (!isAuthed && isProtected(pathname)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
