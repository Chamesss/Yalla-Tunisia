import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }, res: NextResponse) {
    try {
        const itemRef = doc(db, 'users', route.params.id);
        const itemSnapshot = await getDoc(itemRef);

        if (itemSnapshot.exists()) {
            const user = JSON.parse(JSON.stringify(itemSnapshot.data()));
            const data = {
                id: itemSnapshot.id,
                ...user
            }
            return Response.json(data);
        } else {
            console.log(
                `No document found for ID: ${route.params.id} in collection: ${'users'}`
            );
            return Response.json({ user: undefined });;
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
        throw error;
    }
}  