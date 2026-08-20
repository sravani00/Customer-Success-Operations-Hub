import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const isPublicPath = 
    pathname === '/login' || 
    pathname.startsWith('/api/auth');

  const authCookie = request.cookies.get('site_auth')?.value;
  const isAuthenticated = authCookie === 'authenticated';

  // If user is trying to access login page while already authenticated, redirect to dashboard
  if (pathname === '/login' && isAuthenticated) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url), { status: 302 });
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // If path requires auth and user is NOT authenticated, redirect to login page
  if (!isPublicPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl, { status: 302 });
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/assets with extensions (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
