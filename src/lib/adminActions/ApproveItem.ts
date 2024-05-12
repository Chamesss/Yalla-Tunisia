import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import getUserFromCookies from "../getUserFromCookies";
import { db } from "@/firebase";
import ApproveUser from "./ApproveUser";

export async function ApproveItemAdmin(id: string, CategoryName: string) {
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
            ItemData.status = true;

            await updateDoc(itemRef, ItemData);
            return true
        } else {
            console.warn("Item not found:", id);
        }
    } catch (error) {
        console.error("Error approving item:", error);
        return error
    }
}

