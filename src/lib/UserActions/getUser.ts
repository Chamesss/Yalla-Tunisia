"use server";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function getUserById(
    itemId: string
): Promise<DocumentData | undefined> {
    try {
        const itemRef = doc(db, 'users', itemId);
        const itemSnapshot = await getDoc(itemRef);

        if (itemSnapshot.exists()) {
            const result = JSON.parse(JSON.stringify(itemSnapshot.data()));
            const data = {
                id: itemSnapshot.id,
                ...result
            }
            return data
        } else {
            console.log(
                `No document found for ID: ${itemId} in collection: ${'users'}`
            );
            return undefined;
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
        throw error;
    }
}
