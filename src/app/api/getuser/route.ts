import { fetchData } from "../utils/Endpoint"

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // const res = await fetchData("/users")
    // const filteredData = res.filter((d: { id: string | null }) => d.id === id)

    // return Response.json(filteredData)
    return Response.json({ data: "hello world" });
}