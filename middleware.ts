import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'uk']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path already has a language prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return // Do nothing if the language is already in the URL
  }

  // If no language is present, redirect to the default language ('en')
  request.nextUrl.pathname = `/en${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // This is the crucial part: it tells the middleware to run on page requests
  // but to SKIP any request that looks like a file (e.g., has a dot in it).
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
}