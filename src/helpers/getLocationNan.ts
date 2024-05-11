""
import { cities } from "@/cities";
import { getUserById } from "@/lib/UserActions/getUser";

export const handleCity = async (listing: ProductSports | ProductGuides | ProductHandMade) => {
    if (listing.location === "nan") {
        try {
            const result = await fetch(`/api/users/getuser/${listing.userId}`)
            const user = await result.json() as userType

            const city = cities.find((c) => c.id === user.activeAreaId);
            if (city?.city) {
                return city.city;
            }
        } catch (error) {
            console.log(error)
            return false
        }

        return "location unavailable";
    } else {
        return listing.location;
    }
};