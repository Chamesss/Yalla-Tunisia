export async function getHomeMades() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/handmades/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getSports() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sports/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getGuides() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guide/`)
    if (!res.ok) throw new Error
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`)
    if (!res.ok) throw new Error
    return res.json()
}