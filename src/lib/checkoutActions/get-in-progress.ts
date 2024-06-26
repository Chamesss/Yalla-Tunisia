"use server"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getInProgress(userId: string) {
    try {
        const transactionsHomemadeRef = collection(db, "TransactionsHomemade");
        const transactionsSportRef = collection(db, "TransactionsSport");
        const transactionsGuideRef = collection(db, "TransactionsGuide");
        const qHomemades = query(transactionsHomemadeRef, where("buyerId", "==", userId));
        const qSports = query(transactionsSportRef, where("buyerId", "==", userId));
        const qGuides = query(transactionsGuideRef, where("buyerId", "==", userId));
        const querySnapshotHomemade = await getDocs(qHomemades);
        const querySnapshotSport = await getDocs(qSports);
        const querySnapshotGuide = await getDocs(qGuides);

        let products = []

        if (!querySnapshotHomemade.empty) {
            for (const i in querySnapshotHomemade) {
                console.log(i)
            }
        }

        if (!querySnapshotSport.empty) {
            for (const i in querySnapshotSport) {
                console.log(i)
            }
        }

        if (!querySnapshotGuide.empty) {
            for (const i in querySnapshotGuide) {
                console.log(i)
            }
        }

        return true
        // return JSON.parse(JSON.stringify({ success: true, id: TransactionsRef.id }));
    } catch (error) {
        console.error("Error creating sport transaction:", error);
        if (error instanceof Error) {
            return JSON.parse(JSON.stringify({ success: false, error: error.message }));
        } else {
            return JSON.parse(JSON.stringify({ success: false, error: "An unknown error occurred" }));
        }
    }
}