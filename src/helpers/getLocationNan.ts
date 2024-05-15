""
import { cities } from "@/cities";

export const handleCity = async (listing: ProductSports | ProductGuides | ProductHandMade) => {
    if (listing.location === "nan") {
        try {
            const result = await fetch(`/api/users/getuser/${listing.userId}`, {
                cache: "force-cache",
                next: { revalidate: 3600 }
            })
            const user = await result.json() as userType

            const city = cities.find((c) => c.id === user.activeAreaId);
            if (city?.city) {
                return city.city;
            }
        } catch (error) {
            console.log(error)
            return "Something went wrong";
        }

        return "location unavailable";
    } else {
        return listing.location;
    }
};