"use server"
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../../firebase";

export async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const userId = userCredential.user.uid;
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        return { success: true, user: userData, userId: userId }
    } catch (e) {
        console.log(e);
        return { success: false }
    }
}