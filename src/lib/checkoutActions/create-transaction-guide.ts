"use server"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function createTransactionGuide(offerId: string, sellerId: string, buyerId: string, amount: number, duration: number, totalGroup: number, selectedDate: string, hourly: boolean) {
    try {
        const transaction = {
            offerId,
            buyerId,
            sellerId,
            amount,
            buyerCompletion: null,
            sellerCompletion: null,
            duration,
            totalGroup,
            selectedDate,
            hourly,
        }
        const TransactionsRef = doc(collection(db, "TransactionsGuide"));
        await setDoc(TransactionsRef, transaction);

        return JSON.parse(JSON.stringify({ success: true, id: TransactionsRef.id }));
    } catch (error) {
        console.error("Error fetching home made data:", error);
        return JSON.parse(JSON.stringify({ success: false }));
    }
}