"use server"
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

export default async function createTransactionSport(offerId: string, sellerId: string, buyerId: string, amount: number, duration: string, totalGroup: number, selectedDate: string) {
    try {
        const transactionsRef = collection(db, "TransactionsSport");
        const q = query(transactionsRef, where("offerId", "==", offerId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return JSON.parse(JSON.stringify({ success: false, message: "Transaction with this offerId already exists" }));
        }

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
        };
        const TransactionsRef = doc(transactionsRef);
        await setDoc(TransactionsRef, transaction);

        const itemRef = doc(collection(db, "Sports"), offerId);
        const itemSnap = await getDoc(itemRef);
        if (itemSnap.exists()) {
            const ItemData = itemSnap.data();
            ItemData.sold = true;
            await updateDoc(itemRef, ItemData);
        } else {
            console.warn("Item not found:", offerId);
        }

        return JSON.parse(JSON.stringify({ success: true, id: TransactionsRef.id }));
    } catch (error) {
        console.error("Error creating sport transaction:", error);
        if (error instanceof Error) {
            return JSON.parse(JSON.stringify({ success: false, error: error.message }));
        } else {
            return JSON.parse(JSON.stringify({ success: false, error: "An unknown error occurred" }));
        }
    }
}