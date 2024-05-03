"use server"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { formatString } from "@/helpers/UpperCase";
import { cities } from "@/cities";

//Error code: 1 = firstname | 2 = email | 3 = password | 4 = location | 5 = email in use

export default async function addUser(prevState: any, formData: FormData) {
    const address = formData.get("email") as string
    const name = formData.get("username") as string
    const password = formData.get("password") as string
    const activeAreaId = formData.get("activeAreaId") as string
    const email = String(address).trim().toLowerCase();
    const username = formatString(name)
    const city = cities.find((c) => c.id === activeAreaId)
    const lng = city?.lng
    const lat = city?.lat
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );

        const userRef = doc(collection(db, "users"), userCredential.user.uid);
        await setDoc(userRef, {
            username,
            picture: `https://ui-avatars.com/api/?name=${username}`,
            email,
            activeAreaId,
            seller: false,
            description: "",
            trusted: false,
            lng: lng,
            lat: lat,
            created_at: new Date(),
            tel: "",
            status: false,
            banned: false,
        });
        return { response: { success: true, error: 0, message: "" } }
    } catch (error) {
        console.log(error)
        if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
            return { response: { success: false, error: 5, message: "This email is already in use." } };
        } else {
            return { response: { success: false, error: 1, message: error } };
        }
    }

}