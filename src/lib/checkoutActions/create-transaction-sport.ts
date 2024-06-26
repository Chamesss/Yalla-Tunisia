"use server"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function createTransactionSport(offerId: string, sellerId: string, buyerId: string, amount: number, duration: string, totalGroup: number, selectedDate: string) {
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
            selectedDate
        }
        const TransactionsRef = doc(collection(db, "TransactionsSport"));
        await setDoc(TransactionsRef, transaction);

        return JSON.parse(JSON.stringify({ success: true, id: TransactionsRef.id }));
    } catch (error) {
        console.error("Error fetching home made data:", error);
        return JSON.parse(JSON.stringify({ success: false }));
    }
}