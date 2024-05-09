import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import getUserFromCookies from "../getUserFromCookies";
import { db } from "@/firebase";

export async function unbanItem(id: string, CategoryName: string) {
    const user = await getUserFromCookies()
    if (!user) {
        throw new Error("Permission denied");
    }
    if (user.user?.isAdmin === false) {
        throw new Error("Permission denied");
    }
    if (!id) {
        throw new Error("Missing user ID");
    }

    try {
        const itemRef = doc(collection(db, CategoryName), id);
        const itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
            const ItemData = itemSnap.data();
            ItemData.disabled = false;

            await updateDoc(itemRef, ItemData);
            console.log("User disabled successfully:", id);
            return true
        } else {
            console.warn("User not found:", id);
        }
    } catch (error) {
        console.error("Error disabling user:", error);
        return error
    }
}