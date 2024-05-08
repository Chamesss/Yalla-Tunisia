import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";

export async function getHandMadesAdmin() {
    try {
        const HandmadeRef = collection(db, "Handmades");
        const HandmadeQuery = query(HandmadeRef);
        const HandmadeQuerySnapshot = await getDocs(HandmadeQuery);
        const Handmades = HandmadeQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Handmades
    } catch (error) {
        console.error("Error getting users:", error);
        return false
    }
}

export async function getSportsAdmin() {
    try {
        const sportsRef = collection(db, "Sports");
        const SportsQuery = query(sportsRef);
        const SportsQuerySnapshot = await getDocs(SportsQuery);
        const Sports = SportsQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return Sports
    } catch (error) {
        console.error("Error getting users:", error);
        return false
    }
}

export async function getGuidesAdmin() {
    try {
        const guideRef = collection(db, "Guides");
        const GuideQuery = query(guideRef);
        const GuideQuerySnapshot = await getDocs(GuideQuery);
        const Guides = GuideQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Guides
    } catch (error) {
        console.error("Error getting users:", error);
        return false
    }
}