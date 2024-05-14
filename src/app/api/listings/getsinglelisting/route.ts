import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.headers.get('id')
    const ref = req.headers.get('ref')
    if (id && ref) {
        try {
            const itemRef = doc(db, ref, id);
            const itemSnapshot = await getDoc(itemRef);
            const itemId = itemSnapshot.id
            if (itemSnapshot.exists()) {
                const item = itemSnapshot.data();
                const response = {
                    id: itemId,
                    ...item
                };
                return Response.json(response);
            } else {
                console.log(
                    `No document found for ID: ${id} in collection: ${ref}`
                );
                return Response.json({ item: undefined });;
            }
        } catch (error) {
            console.error("Error retrieving document:", error);
            throw error;
        }
    } else {
        return Response.json('No id and ref found');;
    }

}  