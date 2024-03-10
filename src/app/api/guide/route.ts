import { NextResponse } from "next/server"
import { fetchData } from "../utils/Endpoint"

export async function GET() {
    const res = await fetchData("/lists")
    const data = await res.json()
    const filteredData = data.filter((item: { category: { id: number } }) => item.category.id === 3)
    return NextResponse.json(filteredData)
}