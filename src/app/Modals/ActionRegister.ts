import { createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../../../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";

export async function addUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const picture = formData.get("picture") as File;
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const location = formData.get("location")
    const password = '123456'
    if (!email || !firstname || !lastname || !picture) {
        console.log('fill the form')
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

        console.log("User created successfully!");
        return {
            success: true,
        };
    } catch (error) {
        console.log(error)
        return { success: false }
    }

}