import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Assuming this line imports the initialized Firebase app

export default async function getGuides() {
    try {
        const guideCollection = collection(db, "Guides");
        const snapshot = await getDocs(guideCollection);
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