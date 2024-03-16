import { fetchData } from "@/app/api/utils/Endpoint"

export async function getItem(id: string) {
    //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings?id=${id}`)
    const res = await fetchData("/listings")
    if (!res.ok) throw new Error
    const data = await res.json()
    const filteredData = data.filter((d: { id: string | null }) => d.id === id)
    return filteredData
}