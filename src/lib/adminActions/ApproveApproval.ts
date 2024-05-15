import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import getUserFromCookies from "../getUserFromCookies";
import { db } from "@/firebase";
import ApproveUser from "./ApproveUser";

export async function ApproveApprovals(id: string) {
    const user = await getUserFromCookies()
    if (!user) {
        throw new Error("Permission denied");
    }
    if (user.user?.isAdmin === false) {
        throw new Error("Permission denied");
    }
    if (!id) {
        throw new Error("Missing user ID");
    }
    try {
        const approvalRef = doc(db, 'Approval', id);
        const approvalSnapshot = await getDoc(approvalRef);

        // Check if any documents exist in the snapshot
        if (approvalSnapshot.exists()) {
            const approvalData = approvalSnapshot.data()
            approvalData.status = true;
            await updateDoc(approvalRef, approvalData);
            await ApproveUser(id)
            return true;
        } else {
            console.warn("User not found:", id);
            return false;
        }
    } catch (error) {
        console.error("Error disabling user:", error);
        return error
    }
}

