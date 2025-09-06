import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'uk'];
const defaultLocale = 'en';

// This function will run on every request
export function middleware(request: NextRequest) {
  // Check if the URL pathname is missing a language prefix (e.g., /en or /uk)
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If the language prefix is missing, redirect to the default language (English)
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

// This configures the middleware to run on all paths except for specific Next.js/API/static files.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

