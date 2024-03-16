import { fetchData } from "@/app/api/utils/Endpoint"

export async function getUser(id: string) {
    //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getuser?id=${id}`)
    const res = await fetchData("/users")
    if (!res.ok) throw new Error
    const data = await res.json()
    const filteredData = data.filter((d: { id: string | null }) => d.id === id)
    return filteredData
}