"use server"
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

export default async function removeFromFavorites(userId: string, itemId: string) {
    try {
        const favoritesRef = doc(db, 'Favorites', userId);
        const favoritesSnapshot = await getDoc(favoritesRef);

        if (favoritesSnapshot.exists()) {
            await updateDoc(favoritesRef, {
                favorites: arrayRemove(itemId)
            });
            return { response: { success: true, error: 0, message: '' } };
        } else {
            console.log('Favorites document not found for the user');
            return { response: { success: false, error: 1, message: 'Favorites document not found for the user' } };
        }
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return { response: { success: false, error: 2, message: 'Internal server error' } };
    }
}