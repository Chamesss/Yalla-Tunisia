import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export async function getAllUsers() {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data());
        const result = JSON.parse(JSON.stringify(users));
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}