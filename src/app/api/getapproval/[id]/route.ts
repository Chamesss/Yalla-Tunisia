import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }, res: NextResponse) {
    try {
        const approvalRef = doc(db, 'Approval', route.params.id);
        const approvalSnapshot = await getDoc(approvalRef);

        if (approvalSnapshot.exists()) {
            const data = {
                id: approvalSnapshot.id,
                ...approvalSnapshot.data()
            }
            return Response.json(data);
        } else {
            console.log(`No approvals found for user ID: ${route.params.id}`);
            return Response.json({});
        }
    } catch (error) {
        console.error("Error retrieving approvals:", error);
        throw error;
    }
}  