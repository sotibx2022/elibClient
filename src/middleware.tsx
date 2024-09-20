import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    // Paths
    const authPaths = ['/auth/login', '/auth/signup'];
    const privatePaths = ['/dashboard', '/dashboard/*'];
    const { pathname } = request.nextUrl;
    // Redirect logic for authenticated users
    if (token) {
        if (authPaths.some(path => pathname.startsWith(path))) {
            // If the user is authenticated but accessing login or signup, redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        }
    } 
    // Redirect logic for unauthenticated users
    else {
        if (privatePaths.some(path => pathname.startsWith(path))) {
            // If the user is unauthenticated and accessing private paths, redirect to login or dashboard
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    // No redirection required, continue as normal
    return NextResponse.next();
}
// Config matcher: Adjust this based on which paths you want the middleware to run for
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*', '/auth/:path*'], // Paths where the middleware should apply
};
