import getBusinessName from '@/lib/ListingActions/getBusinessName';
import { useCallback, useState } from 'react';

type Data = ProductHandMade | ProductSports | ProductGuides;

export const useBusinessName = () => {
    const [businessName, setBusinessName] = useState<string | null>();
    const [loading, setLoading] = useState(true);

    const fetchBusinessName = useCallback(async (data: Data) => {
        try {
            const result = (await getBusinessName(data.userId)) as Approvals | boolean;
            if (typeof result === "object") {
                setBusinessName(result.bName);
            } else {
                setBusinessName(null);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }, []);

    return { businessName, loading, fetchBusinessName };
};