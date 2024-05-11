import { NextResponse } from "next/server"
import { fetchData } from "../utils/Endpoint"
import { NextApiRequest, NextApiResponse } from "next";
import { headers, cookies } from 'next/headers';

export const revalidate = 0

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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