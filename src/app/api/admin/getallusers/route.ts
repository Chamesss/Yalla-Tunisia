import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next";
import { headers, cookies } from 'next/headers';
import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export const revalidate = 60

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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