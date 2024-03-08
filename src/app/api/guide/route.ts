import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('http://localhost:3001/lists?_limit=20')
    const data = await res.json()
    return NextResponse.json(data)
}
