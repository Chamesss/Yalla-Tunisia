
const isDevelopment = process.env.NODE_ENV === 'development';

const apiUrl = isDevelopment
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_API_URL;

export async function getHomeMades() {
    const res = await fetch(`${apiUrl}/api/handmades/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getSports() {
    const res = await fetch(`${apiUrl}/api/sports/`)
    if (!res.ok) throw new Error
    return res.json()
}
export async function getGuides() {
    const res = await fetch(`${apiUrl}/api/guide/`)
    if (!res.ok) throw new Error
    return res.json()
}

export async function getCategories() {
    const res = await fetch(`${apiUrl}/api/categories/`)
    if (!res.ok) throw new Error
    return res.json()
}