import { db } from "@/firebase";
import { query, collection, where, getDoc, doc } from "firebase/firestore";

export default async function getBusinessName(userId: string) {
    try {
        const favoritesRef = doc(db, 'Approval', userId);
        const favoritesSnapshot = await getDoc(favoritesRef);
        if (favoritesSnapshot.exists()) {
            return favoritesSnapshot.data()
        }
        return false
    } catch (e) {
        console.log(e)
        return false
    }
}