const baseURL = "http://localhost:3000"

export async function getHomeMades() {
    const res = await fetch(`${baseURL}/api/handmades/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getSports() {
    const res = await fetch(`${baseURL}/api/sports/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getGuides() {
    const res = await fetch(`${baseURL}/api/guide/`)
    if (!res.ok) throw new Error
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${baseURL}/api/categories/`)
    if (!res.ok) throw new Error
    return res.json()
}