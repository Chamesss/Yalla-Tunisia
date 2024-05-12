import { NextRequest, NextResponse } from "next/server"
import { headers, cookies } from 'next/headers';

export const revalidate = 60

export async function GET(req: NextRequest, res: NextResponse) {
    console.log('context from next req/res === ', req.headers)
    const contextHeader = headers().get('context')
    console.log('context from next/headers === ', contextHeader)
    const cookieStore = cookies()
    const userValue = cookieStore.get('userData')
    if (userValue) {
        const user = JSON.parse(userValue.value) as userSlice;
        console.log('user === ', user.user)
    } else {
        console.log('no userValue found.')
    }

    return Response.json({ data: "hello world" });
}   