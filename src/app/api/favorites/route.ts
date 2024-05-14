import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: Request, response: Response) {
    const userId = request.headers.get('userId')

    if (!userId) {
        throw new Error('No id found')
    }

    const favoritesRef = doc(db, 'Favorites', userId);
    const favoritesSnapshot = await getDoc(favoritesRef);

    if (favoritesSnapshot.exists()) {
        const favorites = JSON.parse(JSON.stringify(favoritesSnapshot.data()));
        return Response.json({ favorites });
    } else {
        console.log(
            `No document found for ID: ${userId} in collection: ${'users'}`
        );
        return Response.json({ favorites: undefined });;
    }

}