import { NextResponse } from "next/server"
import { fetchData } from "../utils/Endpoint"

export const revalidate = 0

export async function GET() {
  // const res = await fetchData("/listings")
  // const filteredData = res.filter((item: { category: { id: number }[] }) => item.category[0].id === 1)
  // return NextResponse.json(filteredData)
  return Response.json({ data: "hello world" });
}
