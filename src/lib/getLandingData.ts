import { fetchData } from "@/app/api/utils/Endpoint"

export async function getHomeMades() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/handmades/`)
    const res = await fetchData("/listings")
    if (!res.ok) throw new Error
    const data = await res.json()
    const filteredData = data.filter((item: { category: { id: number }[] }) => item.category[0].id === 1)
    return filteredData
}
export async function getSports() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sports/`)
    const res = await fetchData("/listings")
    if (!res.ok) throw new Error
    const data = await res.json()
    const filteredData = data.filter((item: { category: { id: number }[] }) => item.category[0].id === 2)
    return filteredData
}
export async function getGuides() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guide/`)
    const res = await fetchData("/listings")
    if (!res.ok) throw new Error
    const data = await res.json()
    const filteredData = data.filter((item: { category: { id: number }[] }) => item.category[0].id === 3)
    return filteredData
}

export async function getCategories() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`)
    const res = await fetchData("/categories")
    if (!res.ok) throw new Error
    const data = await res.json()
    return data
}