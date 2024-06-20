import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedDirs = [
  '/app/:path*',
  '/developer/:path*',
  '/development/:path*'
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow requests to static files and Next.js internal routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    const authCookie = req.cookies.get('authorization');
    
    if (
      !req.cookies.has('authorization') || 
      !isValidAuth(authCookie)
    ) {
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

function isValidAuth(authCookie: any): boolean {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    jwt.verify(authCookie, secret);
    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return false;
  }
}

export const config = {
  matcher: ['/:path*'],
};
