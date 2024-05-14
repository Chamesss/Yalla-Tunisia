"use server"
import { db } from "@/firebase";
import { setDoc, doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";

export default async function addToFavorites(userId: string, itemId: string, CategoryName: string) {

    try {
        const favoritesRef = doc(db, 'Favorites', userId);
        const favoritesSnapshot = await getDoc(favoritesRef);
        if (!favoritesSnapshot.exists()) {
            await setDoc(favoritesRef, { userId, favorites: { id: itemId, ref: CategoryName } });
        } else {
            await updateDoc(favoritesRef, {
                favorites: arrayUnion({ id: itemId, ref: CategoryName })
            });
        }

        return { response: { success: true, error: 0, message: "" } }
    } catch (error) {
        console.log(error)
    }

}