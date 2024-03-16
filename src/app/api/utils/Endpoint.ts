export async function fetchData(path: string) {
    const res = await fetch(`http://localhost:3001${path}`)
    // console.log(res)
    // const data = await res.json()
    return res
}