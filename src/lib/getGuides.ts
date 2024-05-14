import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default async function getGuides() {
    try {
        const GuidesCollection = collection(db, "Guides");
        const querySnapshot = await getDocs(query(GuidesCollection, where("status", "==", true), limit(20)));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching home made data:", error);
        throw error;
    }
}