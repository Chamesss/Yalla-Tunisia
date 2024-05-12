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
        const approvalsQuery = query(collection(db, 'Approval'), where('userId', '==', id));
        const approvalSnapshot = await getDocs(approvalsQuery);

        // Check if any documents exist in the snapshot
        if (!approvalSnapshot.empty) {
            approvalSnapshot.forEach(async (doc) => {
                const itemData = doc.data();
                itemData.status = true;
                await updateDoc(doc.ref, itemData);
                await ApproveUser(id)
                console.log("User disabled successfully:", id);
            });
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

