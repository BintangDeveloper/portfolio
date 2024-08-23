import { NextRequest, NextResponse } from 'next/server';

// Define protected directories
const protectedDirs = [
  '/app/:path*',
  '/developer/:path*',
  '/development/:path*'
];

// Expected debugKey value
const EXPECTED_DEBUG_KEY = '16333057394';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow requests to static files and Next.js internal routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    // Check for debugKey in the query string or headers
    const queryDebugKey = searchParams.get('debugKey');
    const headerDebugKey = req.headers.get('debugKey');

    // Validate the debugKey
    if (queryDebugKey !== EXPECTED_DEBUG_KEY && headerDebugKey !== EXPECTED_DEBUG_KEY) {
      // Redirect to an error page if debugKey is missing or invalid
      return NextResponse.redirect(new URL('/_error', req.url));
    }
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
  return protectedDirs.some((pattern) =>
    new RegExp(pattern.replace(':path*', '.*')).test(pathname)
  );
}

export const config = {
  matcher: ['/:path*'],
};
