import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const reqUrl = request.nextUrl.pathname
    const user = request.cookies.get('userData');
    if (user) {
        const userData = JSON.parse(user.value) as userSlice
        if (userData.user?.seller === false && (reqUrl === "/addlisting/panel" || reqUrl === "/addlisting/panel/edit" || reqUrl === "/addlisting/panel/create" || reqUrl === "/addlisting")) {
            return NextResponse.redirect(new URL('/addlisting/check', request.url))
        }
        if (userData.user?.seller === true && (reqUrl === "/addlisting/check" || reqUrl === "/addlisting")) {
            return NextResponse.redirect(new URL('/addlisting/panel', request.url))
        }
        if (userData.user?.isAdmin === false && reqUrl === "/admin") {
            return NextResponse.redirect(new URL('/forbidden', request.url))
        }
        if (reqUrl === "/login" || reqUrl === "/register") {
            return NextResponse.redirect(new URL('/forbidden', request.url))
        }
    } else {
        if (reqUrl === "/addlisting/panel" || reqUrl === '/addlisting/check' || reqUrl === "/addlisting/panel/edit" || reqUrl === "/addlisting/panel/create" || reqUrl === "/addlisting" || reqUrl === "/admin") {
            return NextResponse.redirect(new URL('/forbidden', request.url))
        }
        if (reqUrl === "/favorites") return NextResponse.redirect(new URL('/forbidden', request.url))

    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/addlisting/:path*', '/admin', '/register', '/login', '/favorites']
}