import { NextResponse } from "next/server"
import { fetchData } from "../utils/Endpoint"

export async function GET() {
    const res = await fetchData("/categories")
    const data = await res.json()
    return NextResponse.json(data)
}