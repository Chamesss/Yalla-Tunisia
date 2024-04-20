import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function getHandmades() {
    try {
        const homeMadesCollection = collection(db, "Handmades");
        const snapshot = await getDocs(homeMadesCollection);
        const data = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching home made data:", error);
        throw error;
    }
}