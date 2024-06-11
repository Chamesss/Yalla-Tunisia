import { db } from "@/firebase";
import { query, collection, where, getDoc, doc } from "firebase/firestore";

export default async function getBusinessName(userId: string) {
    try {
        const approvalRef = doc(db, 'Approval', userId);
        const approvalSnapshot = await getDoc(approvalRef);
        if (approvalSnapshot.exists()) {
            //@ts-ignore
            const data: Approvals = {
                id: approvalSnapshot.id,
                ...approvalSnapshot.data()
            }
            return data
        }
        return false
    } catch (e) {
        console.log(e)
        return false
    }
}