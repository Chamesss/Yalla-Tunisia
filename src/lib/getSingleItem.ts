import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming 'db' is your Firestore instance

export default async function getSingleItem(collectionName: string, itemId: string) {
    try {
        const itemDocRef = doc(db, collectionName, itemId);
        const itemDocSnapshot = await getDoc(itemDocRef);
        if (itemDocSnapshot.exists()) {
            const data = itemDocSnapshot.data();
            return JSON.parse(JSON.stringify({
                id: itemDocSnapshot.id,
                ...data
            }));
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching single item:", error);
        throw error;
    }
};