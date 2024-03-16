const isDevelopment = process.env.NODE_ENV === 'development';

const apiUrl = isDevelopment
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_API_URL;
export async function getUser(id: string) {
    const res = await fetch(`${apiUrl}/api/getuser?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}