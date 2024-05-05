import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const user = request.cookies.get('userData');
    if (user) {
        const userData = JSON.parse(user.value) as userSlice
        if (userData.user?.seller === false) {
            return NextResponse.redirect(new URL('/addlisting/check', request.url))
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/addlisting/panel/:path*', '/addlisting/panel']
}