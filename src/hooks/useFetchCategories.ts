import { getCategories } from '@/lib/getLandingData';
import { useEffect, useState } from 'react';

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await getCategories()
                setCategories(res);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        })();
    }, []);

    return { categories, loading };
};

export default useFetchCategories;