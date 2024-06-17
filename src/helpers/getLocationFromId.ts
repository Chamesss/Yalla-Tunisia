import { cities } from "@/cities";

export function getLocationFromId(id: string) {
    const index = cities.findIndex(c => c.id === id)
    if (index > -1) {
        return cities[index].city
    } else {
        return "Location unavailable"
    }
}