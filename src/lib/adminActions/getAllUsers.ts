import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export async function getAllUsers() {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        return false
    }
}