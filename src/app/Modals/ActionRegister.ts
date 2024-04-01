import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { addUserSession, userSlice } from "@/redux/slices/userSlice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

type loginProps = {
    email: string,
    password: string,
    dispatch: ThunkDispatch<{
        user: userSlice;
    }, undefined, UnknownAction> & Dispatch<UnknownAction>
}

export async function addUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const picture = formData.get("picture") as File;
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const location = formData.get("location")
    const password = '123456'
    if (!email || !firstname || !lastname || !picture) {
        return { success: false }
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${firstname}/${picture.name}`);
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
            firstname,
            lastname,
            location
        });

        return {
            success: true,
        };
    } catch (error) {
        console.log(error)
        return { success: false }
    }

}

export async function Login({ email, password, dispatch }: loginProps) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data()
        dispatch(addUserSession({ user: userData, isLogged: true }))
        return { success: true }
    } catch (e) {
        console.log(e)
    }
}