export async function getUser(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getuser?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}