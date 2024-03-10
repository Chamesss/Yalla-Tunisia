export async function fetchData(path: any) {
    const baseUrl = process.env.NEXT_PUBLIC_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL_PROD || "https://production-url.com"
        : process.env.NEXT_PUBLIC_BASE_URL_DEV || "http://localhost:3001"

    const res = await fetch(`${baseUrl}${path}`)
    const data = await res.json()
    return data
}