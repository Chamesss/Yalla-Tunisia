export async function getItem(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}