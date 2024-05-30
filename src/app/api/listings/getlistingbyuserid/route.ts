import { db } from "@/firebase";
import { DocumentData, query, collection, where, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
    let table1Docs: DocumentData[] = [];
    let table2Docs: DocumentData[] = [];
    let table3Docs: DocumentData[] = [];

    const userId = request.headers.get('userId')

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
        table1Snapshot.forEach((doc) =>
            table1Docs.push({ ...doc.data(), id: doc.id })
        );

        const table2Snapshot = await getDocs(table2Query);
        table2Snapshot.forEach((doc) =>
            table2Docs.push({ ...doc.data(), id: doc.id })
        );

        const table3Snapshot = await getDocs(table3Query);
        table3Snapshot.forEach((doc) =>
            table3Docs.push({ ...doc.data(), id: doc.id })
        );

        const result = {
            Handmades: table1Docs,
            Sports: table2Docs,
            Guides: table3Docs,
        };
        return Response.json(result);

    } catch (error) {
        console.error("Error retrieving documents:", error);
        throw error;
    }
}