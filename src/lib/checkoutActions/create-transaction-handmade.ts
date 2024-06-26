"use server"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function createTransactionHandmade(offerId: string, sellerId: string, buyerId: string, amount: number, selectedColor: string, selectedSize: string, qte: number) {
    try {
        const transaction = {
            offerId,
            buyerId,
            sellerId,
            amount,
            buyerCompletion: null,
            sellerCompletion: null,
            selectedColor,
            selectedSize,
            qte
        }
        const TransactionsRef = doc(collection(db, "Transactions"));
        await setDoc(TransactionsRef, transaction);

        return JSON.parse(JSON.stringify({ success: true, id: TransactionsRef.id }));
    } catch (error) {
        console.error("Error fetching home made data:", error);
        return JSON.parse(JSON.stringify({ success: false }));
    }
}