"use server"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth, app } from "../../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

//Error code: 1 = firstname | 2 = email | 3 = password | 4 = location | 5 = email in use

export default async function addUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const picture = formData.get("picture") as File;
    const username = formData.get("username") as string
    const location = formData.get("location") as string
    const password = formData.get("password") as string
    const activeAreaId = formData.get("activeAreaId") as string
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${username}/${picture.name}`);
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const snapshot = await uploadBytes(storageRef, picture)
        const downloadURL = await getDownloadURL(snapshot.ref);
        const userRef = doc(collection(db, "users"), userCredential.user.uid);
        await setDoc(userRef, {
            email,
            picture: downloadURL,
            username,
            location
        });

        return { response: { success: true, error: 0, message: "" } }
    } catch (error) {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
            return { response: { success: false, error: 5, message: "This email is already in use." } };
        } else {
            return { response: { success: false, error: 1, message: error } };
        }
    }

}