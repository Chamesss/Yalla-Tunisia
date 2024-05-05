import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    "use client"
    if (request.nextUrl.pathname.startsWith('/addlisting')) {
        return NextResponse.rewrite(new URL('/about-2', request.url))
    }
    const user = useSelector(userState);
    if (user.user?.seller === false)
        return NextResponse.redirect(new URL('/forbidden', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/addlisting/panel/:path*', '/addlisting/panel']
}