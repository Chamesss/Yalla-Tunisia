import { db } from "@/firebase";
import { collection, getDocs, limitToLast, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: { params: { n: string } }) {
    try {
        const docName = req.headers.get('docName')
        if (docName) {
            const offersRef = collection(db, docName);
            const offersSnapshot = await getDocs(offersRef);
            const totalOffers = offersSnapshot.size;

            if (totalOffers < 20) {
                const offers = await getDocs(offersRef);
                const offersList = offers.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                return Response.json(offersList);
            }

            const limit = Math.min(20, totalOffers);
            const Query = query(offersRef, limitToLast(limit));
            const randomOffersSnapshot = await getDocs(Query);
            const randomOffers = randomOffersSnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            return Response.json(randomOffers);
        } else {
            return Response.json("no doc name")
        }

    } catch (error) {
        console.error("Error retrieving documents:", error);
        throw error;
    }
}