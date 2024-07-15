import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  // // Manually exclude paths
  const excludedPaths = ['/'];
  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token');
  console.log('token:', token);
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply this middleware to all routes
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
