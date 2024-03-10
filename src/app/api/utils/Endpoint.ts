export async function fetchData(path: string) {
    console.log(process.env.NEXT_PUBLIC_ENV)
    console.log(process.env.NEXT_PUBLIC_BASE_URL_PROD)
    console.log(process.env.NEXT_PUBLIC_BASE_URL_DEV)
    const baseUrl = process.env.NEXT_PUBLIC_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL_PROD || "https://production-url.com"
        : process.env.NEXT_PUBLIC_BASE_URL_DEV || "http://localhost:3001"

    const res = await fetch(`${baseUrl}${path}`)
    const data = await res.json()
    return data
}