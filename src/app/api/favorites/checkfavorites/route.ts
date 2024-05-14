import { db } from "@/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function GET(request: Request, response: Response) {
    const userId = request.headers.get('userId')
    const itemId = request.headers.get('itemId')

    const Query = query(collection(db, 'Favorites'), where('userId', '==', userId));
    const querySnapshot = await getDocs(Query);

    let favorite: boolean = false

    querySnapshot.forEach(doc => {
        const favorites = doc.data().favorites;
        if (favorites && favorites.includes(itemId)) {
            console.log('Item exists in favorites');
            favorite = true
        } else {
            console.log('Item does not exist in favorites');
            favorite = false
        }
    });

    return Response.json({ isFavorite: favorite });

}