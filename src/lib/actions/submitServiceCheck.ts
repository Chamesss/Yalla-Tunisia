"use server"
import { cookies } from "next/headers"
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
export async function submitProfileCheck(data: any) {
    try {
        const cookieStore = cookies()
        const user = cookieStore.get("userData")
        if (user) {
            const userData = JSON.parse(user.value) as userSlice;
            const userId = userData.userId
            const submitData = {
                userId: userId,
                ...data
            }
            const ApprovalRef = doc(collection(db, "Approval"));
            await setDoc(ApprovalRef, submitData);
            return true
        }
        return false
    } catch (error) {
        return false
    }
}