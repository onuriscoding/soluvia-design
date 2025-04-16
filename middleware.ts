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

// Add cache control for static assets
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // Add cache control headers for static assets
  if (
    pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|ico|svg|woff|woff2|ttf|eot)$/) ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/_next/static')
  ) {
    // Cache for 1 week (604800 seconds)
    response.headers.set('Cache-Control', 'public, max-age=604800, immutable');
  }
  
  // Skip middleware for static files and special routes
  if (
    pathname.includes('.') ||  // files with extensions (images, css, js)
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('favicon')
  ) {
    return response;
  }
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If URL already has locale, don't redirect
  if (pathnameHasLocale) {
    // Allow the request to continue to the destination
    return response;
  }

  // Handle root path - this ensures we don't have conflict between / and /en
  if (pathname === '/') {
    // Redirect to the appropriate locale path
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl, 301); // Use 301 for permanent redirect
  }

  // For all other paths without locale, redirect to the appropriate locale path
  const locale = getLocale(request);
  const newPath = `/${locale}${pathname}`;
  request.nextUrl.pathname = newPath;
  
  return NextResponse.redirect(request.nextUrl, 301); // Use 301 for permanent redirect
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
    
    // Match image and asset paths for cache control
    '/_next/image',
    '/_next/static',
  ],
}; 