const baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://project-tourism-nnszmantm-chamesss-projects.vercel.app";

export async function getUser(id: string) {
    const res = await fetch(`${baseURL}/api/getuser?id=${id}`)
    if (!res.ok) throw new Error
    return res.json()
}