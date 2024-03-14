const baseURL = "http://localhost:3000"

export async function getItem(id: string) {
    const res = await fetch(`${baseURL}/api/listings?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}