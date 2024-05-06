import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const reqUrl = request.nextUrl.pathname
    const user = request.cookies.get('userData');
    if (user) {
        const userData = JSON.parse(user.value) as userSlice
        if (userData.user?.seller === false && (reqUrl === "/addlisting/panel" || reqUrl === "/addlisting/edit" || reqUrl === "/addlisting/create" || reqUrl === "/addlisting")) {
            return NextResponse.redirect(new URL('/addlisting/check', request.url))
        }
        if (userData.user?.seller === true && (reqUrl === "/addlisting/check" || reqUrl === "/addlisting")) {
            return NextResponse.redirect(new URL('/addlisting/panel', request.url))
        }
    } else {
        return NextResponse.redirect(new URL('/forbidden', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/addlisting/:path*']
}