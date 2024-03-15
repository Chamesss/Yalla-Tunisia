const baseURL = "http://localhost:3000"

export async function getUser(id: string) {
    const res = await fetch(`${baseURL}/api/getuser?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}