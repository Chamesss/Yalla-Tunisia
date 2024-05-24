import { cities } from "@/cities"

export const getLocationUserCompute = (id: string) => {
    const city = cities.find((c) => c.id === id)
    return city
}