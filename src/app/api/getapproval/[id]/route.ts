import { db } from "@/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }, res: NextResponse) {
    try {
        const approvalsQuery = query(collection(db, 'Approval'), where('userId', '==', route.params.id));
        const approvalSnapshot = await getDocs(approvalsQuery);

        if (!approvalSnapshot.empty) {
            const approvalData = approvalSnapshot.docs.map(doc => doc.data());
            return Response.json(approvalData);
        } else {
            console.log(`No approvals found for user ID: ${route.params.id}`);
            return Response.json({ approvals: [] });
        }
    } catch (error) {
        console.error("Error retrieving approvals:", error);
        throw error;
    }
}  