import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";

export async function addUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const picture = formData.get("picture")
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const location = formData.get("location")
    const password = '123456'
    console.log('email === ', email)
    console.log('picture === ', picture)
    console.log('firstname === ', firstname)
    console.log('lastname === ', lastname)
    console.log('location === ', location)
    try {
        // const userCredential = await createUserWithEmailAndPassword(
        //     auth,
        //     email,
        //     password,
        // );

        // Add custom user data to Firestore (optional)
        // const userRef = doc(collection(db, "users"), userCredential.user.uid);
        const userRef = doc(collection(db, "users"))
        await setDoc(userRef, {
            email,
            picture,
            firstname,
            lastname,
            location
        });

        console.log("User created successfully!");
        return {
            success: true,
        };
    } catch (error) {
        return { success: false }
    }

}