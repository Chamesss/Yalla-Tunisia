import { db } from "@/firebase";
import { query, collection, where, setDoc, getDocs, doc, arrayUnion, updateDoc } from "firebase/firestore";

export default async function addToFavorites(userId: string, itemId: string) {

    try {

        const Query = query(collection(db, 'Favorites'), where('userId', '==', userId));
        const querySnapshot = await getDocs(Query);
        if (querySnapshot.empty) {
            await setDoc(doc(db, 'Favorites', userId), { userId, favorites: [itemId] });
        } else {
            const docRef = doc(db, 'Favorites', userId);
            await updateDoc(docRef, {
                favorites: arrayUnion(itemId)
            });
        }

        return { response: { success: true, error: 0, message: "" } }
    } catch (error) {
        console.log(error)
    }

}