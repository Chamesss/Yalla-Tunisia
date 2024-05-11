import { db } from "@/firebase";
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";

const ApproveUser = async (id: string) => {
    try {
        const userRef = doc(collection(db, "users"), id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            userData.seller = true;

            await updateDoc(userRef, userData);
            console.log("User disabled successfully:", id);
            return true
        } else {
            console.warn("User not found:", id);
        }
    } catch (e) {
        console.log(e)
    }

}

export default ApproveUser