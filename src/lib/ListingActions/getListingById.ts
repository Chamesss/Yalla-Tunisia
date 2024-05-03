"use server";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function getItemById(
  collectionName: string,
  itemId: string
): Promise<DocumentData | undefined> {
  try {
    const itemRef = doc(db, collectionName, itemId);
    const itemSnapshot = await getDoc(itemRef);

    if (itemSnapshot.exists()) {
      const result = JSON.parse(JSON.stringify(itemSnapshot.data()));
      return result
    } else {
      console.log(
        `No document found for ID: ${itemId} in collection: ${collectionName}`
      );
      return undefined;
    }
  } catch (error) {
    console.error("Error retrieving document:", error);
    throw error;
  }
}
