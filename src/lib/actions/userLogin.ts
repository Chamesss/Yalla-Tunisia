"use server"
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { cookies } from "next/headers";

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
        const cookieStore = cookies();
        cookieStore.set({
            name: "userData",
            value: JSON.stringify({ isLogged: true, user: userData, userId: userId }),
            path: "/",
            maxAge: 86400, // 24 hours
            sameSite: "strict",
        });
        return { success: true, user: userData, userId: userId }
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return { success: false, error: e.message };
        } else {
            return { success: false, error: 'An unknown error occurred' };
        }
    }
}