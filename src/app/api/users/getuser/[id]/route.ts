import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, route: { params: { id: string } }, res: NextApiResponse) {
    try {
        const itemRef = doc(db, 'users', route.params.id);
        const itemSnapshot = await getDoc(itemRef);

        if (itemSnapshot.exists()) {
            const user = JSON.parse(JSON.stringify(itemSnapshot.data()));
            return Response.json(user);
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