"use server";
import { collection, getDocs, query, where, doc as DOC, getDoc, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getInProgress(userId: string) {
    try {
        const transactionsHomemadeRef = collection(db, "TransactionsHandmade");
        const transactionsSportRef = collection(db, "TransactionsSport");
        const transactionsGuideRef = collection(db, "TransactionsGuide");
        const qHomemades = query(transactionsHomemadeRef, where("buyerId", "==", userId));
        const qSports = query(transactionsSportRef, where("buyerId", "==", userId));
        const qGuides = query(transactionsGuideRef, where("buyerId", "==", userId));
        const querySnapshotHomemade = await getDocs(qHomemades);
        const querySnapshotSport = await getDocs(qSports);
        const querySnapshotGuide = await getDocs(qGuides);

        let HandmadesTransactions: any = [];
        let SportsTransactions: any = [];
        let GuidesTransactions: any = [];

        let Handmades: any = [];
        let Sports: any = [];
        let Guides: any = [];

        const homemadePromises = querySnapshotHomemade.docs.map(async (doc) => {
            const data = doc.data();
            HandmadesTransactions.push({
                id: doc.id,
                ...data,
            });
            const homemadeRef = DOC(db, 'Handmades', data.offerId);
            const homemadeSnapshot = await getDoc(homemadeRef);
            if (homemadeSnapshot.exists()) {
                Handmades.push({
                    id: homemadeSnapshot.id,
                    ...homemadeSnapshot.data(),
                });
            }
        });

        const sportPromises = querySnapshotSport.docs.map(async (doc) => {
            const data = doc.data();
            SportsTransactions.push({
                id: doc.id,
                ...data,
            });
            const sportRef = DOC(db, 'Sports', data.offerId);
            const sportSnapshot = await getDoc(sportRef);
            if (sportSnapshot.exists()) {
                Sports.push({
                    id: sportSnapshot.id,
                    ...sportSnapshot.data(),
                });
            }
        });

        const guidePromises = querySnapshotGuide.docs.map(async (doc) => {
            const data = doc.data();
            GuidesTransactions.push({
                id: doc.id,
                ...data,
            });
            const guideRef = DOC(db, 'Guides', data.offerId);
            const guideSnapshot: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(guideRef);
            if (guideSnapshot.exists()) {
                Guides.push({
                    id: guideSnapshot.id,
                    ...guideSnapshot.data(),
                });
            }
        });

        await Promise.all([...homemadePromises, ...sportPromises, ...guidePromises]);

        const products = [...Handmades, ...Sports, ...Guides];
        const transactions = [...HandmadesTransactions, ...SportsTransactions, ...GuidesTransactions];

        console.log(products)

        return JSON.parse(JSON.stringify({ products, transactions }));
    } catch (error) {
        console.error("Error creating sport transaction:", error);
        if (error instanceof Error) {
            return JSON.parse(JSON.stringify({ success: false, error: error.message }));
        } else {
            return JSON.parse(JSON.stringify({ success: false, error: "An unknown error occurred" }));
        }
    }
}