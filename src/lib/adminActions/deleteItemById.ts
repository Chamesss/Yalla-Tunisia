import { db } from "@/firebase";
import { doc, collection, deleteDoc } from "firebase/firestore";
import getUserFromCookies from "../getUserFromCookies";

export async function deleteItemById(id: string, CategoryName: string) {
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
        await deleteDoc(itemRef);
        return true
    } catch (error) {
        console.error("Error deleting user:", error);
        return error
    }
}