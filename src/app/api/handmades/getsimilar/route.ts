import { db } from "@/firebase";
import { collection, getDocs, limitToLast, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { n: string } }) {
    try {
        const docName = req.headers.get('docName')
        if (docName) {
            const usersRef = collection(db, docName);

            // Get the total number of documents in the collection (optional, but useful for efficiency)
            const usersSnapshot = await getDocs(usersRef);
            const totalUsers = usersSnapshot.size; // Assuming you want exactly 20 users

            // If there are less than 20 users, simply return all of them
            if (totalUsers < 20) {
                const users = await getDocs(usersRef);
                const userList = users.docs.map((doc) => doc.data());
                return Response.json(userList);
            }

            // Efficiently retrieve 20 random documents using a query (preferred)
            const limit = Math.min(20, totalUsers); // Ensure we don't exceed the total number of users
            const Query = query(usersRef, limitToLast(limit));
            const randomUsersSnapshot = await getDocs(Query);
            const randomUsers = randomUsersSnapshot.docs.map((doc) => doc.data());

            return Response.json(randomUsers);
        } else {
            return Response.json("no doc name")
        }

    } catch (error) {
        console.error("Error retrieving documents:", error);
        throw error;
    }
}