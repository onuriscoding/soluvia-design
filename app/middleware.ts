import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your supported locales
const locales = ['en', 'fr'];
const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  // Check for locale cookie first
  const cookie = request.cookies.get('NEXT_LOCALE');
  if (cookie && locales.includes(cookie.value)) {
    return cookie.value;
  }

  // Try to detect from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  try {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  } catch (e) {
    console.error('Error parsing Accept-Language header:', e);
  }

  // Fall back to default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Debug: Log all requests coming through middleware
  console.log(`Middleware processing: ${pathname}`);
  
  // Skip middleware for static files and special routes
  if (
    pathname.includes('.') ||  // files with extensions (images, css, js)
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('favicon')
  ) {
    console.log(`Skipping middleware for: ${pathname}`);
    return;
  }
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  console.log(`Path ${pathname} has locale: ${pathnameHasLocale}`);

  // If URL already has locale, don't redirect
  if (pathnameHasLocale) {
    console.log(`URL already has locale: ${pathname}`);
    // Allow the request to continue to the destination
    return NextResponse.next();
  }

  // Redirect to the appropriate locale path
  const locale = getLocale(request);
  console.log(`Redirecting to locale: ${locale}`);
  
  // Build the new URL with locale
  const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  request.nextUrl.pathname = newPath;
  
  console.log(`Redirecting to: ${request.nextUrl.toString()}`);
  return NextResponse.redirect(request.nextUrl);
}

// Configure matcher to handle all routes except static files
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (public files)
     * 4. all files in the public folder
     */
    '/((?!api|_next/static|_next/image|static|.*\\..*|favicon.ico).*)',
  ],
};
