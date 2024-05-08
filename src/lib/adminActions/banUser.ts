import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import getUserFromCookies from "../getUserFromCookies";
import { db } from "@/firebase";

export async function banUser(id: string) {
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
        const userRef = doc(collection(db, "users"), id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            userData.banned = true;

            await updateDoc(userRef, userData);
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