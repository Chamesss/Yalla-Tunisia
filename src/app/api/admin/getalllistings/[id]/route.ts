import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next";
import { headers, cookies } from 'next/headers';
import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export const revalidate = 60

export async function GET(req: NextApiRequest, route: { params: { id: string } }, res: NextApiResponse) {
    try {
        const ItemRef = collection(db, route.params.id);
        const ItemQuery = query(ItemRef);
        const ItemQuerySnapshot = await getDocs(ItemQuery);
        const Items = ItemQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Response.json(Items)
    } catch (error) {
        console.error("Error getting users:", error);
        return Response.json({ data: "hello world" });
    }
}   