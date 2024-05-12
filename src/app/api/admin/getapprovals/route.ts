import { NextRequest, NextResponse } from "next/server"
import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export const revalidate = 0

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const itemsRef = collection(db, "Approval");
        const q = query(itemsRef);
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Response.json(items);
    } catch (error) {
        console.error("Error getting items:", error);
        return Response.json({ error: error });
    }
}   