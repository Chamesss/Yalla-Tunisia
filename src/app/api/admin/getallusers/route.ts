import { NextResponse, NextRequest } from "next/server"
import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export const revalidate = 60

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Response.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        return Response.json({ error: error });
    }
}   