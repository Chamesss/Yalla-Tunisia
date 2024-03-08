const baseURL = "http://localhost:3000"

export async function getHomeMades() {
    const res = await fetch(`${baseURL}/api/handmades/`)
    console.log('handmades')
    return res.json()
}
export async function getSports() {
    const res = await fetch(`${baseURL}/api/sports/`)
    console.log('sports')
    return res.json()
}
export async function getGuides() {
    const res = await fetch(`${baseURL}/api/guide/`)
    console.log('guide')
    return res.json()
}