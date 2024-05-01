"use server";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

export async function getListingsByUserId(userId: string) {
  let table1Docs: DocumentData[] = [];
  let table2Docs: DocumentData[] = [];
  let table3Docs: DocumentData[] = [];

  try {
    const table1Query = query(
      collection(db, "Handmades"),
      where("userId", "==", userId)
    );
    const table2Query = query(
      collection(db, "Sports"),
      where("userId", "==", userId)
    );
    const table3Query = query(
      collection(db, "Guides"),
      where("userId", "==", userId)
    );

    const table1Snapshot = await getDocs(table1Query);
    table1Snapshot.forEach((doc) => table1Docs.push(doc.data()));

    const table2Snapshot = await getDocs(table2Query);
    table2Snapshot.forEach((doc) => table2Docs.push(doc.data()));

    const table3Snapshot = await getDocs(table3Query);
    table3Snapshot.forEach((doc) => table3Docs.push(doc.data()));

    const result = {
      Handmades: table1Docs,
      Sports: table2Docs,
      Guides: table3Docs,
    };

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error retrieving documents:", error);
    throw error;
  }
}
