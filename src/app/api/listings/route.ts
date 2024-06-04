import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    console.log(req.nextUrl.searchParams.get("sub"))
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // const res = await fetchData("/listings")
    // const filteredData = res.filter((d: { id: string | null }) => d.id === id)

    // return Response.json(filteredData)
    return Response.json({ data: "hello world" });
}