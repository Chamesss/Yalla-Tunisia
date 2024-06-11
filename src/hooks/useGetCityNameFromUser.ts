import { useState, useEffect } from 'react';
import { cities } from "@/cities";

export const useCityNameFromUser = () => {
    const [city, setCity] = useState<string>();
    const [loadingCity, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const handleCity = async (listing: Product) => {
        setLoading(true);
        try {
            if (listing.location === "nan") {
                const result = await fetch(`/api/users/getuser/${listing.userId}`, {
                    cache: "force-cache",
                    next: { revalidate: 3600 }
                });
                const user = await result.json() as userType;

                const foundCity = cities.find((c) => c.id === user.activeAreaId);
                if (foundCity?.city) {
                    setCity(foundCity.city);
                } else {
                    setCity("location unavailable");
                }
            } else {
                const index = cities.findIndex((c) => c.id === listing.location)
                if (index > -1) {
                    setCity(cities[index].city)
                } else {
                    setCity(listing.location);
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return { city, loadingCity, error, handleCity };
};