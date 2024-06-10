import { CategoryWNameDoc, categories } from "@/constants/categories";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, query, where, getDocs, orderBy, startAfter, limit, doc, getDoc } from "firebase/firestore";

const collections = ["Handmades", "Guides", "Sports"];

export async function GET(req: NextRequest, res: NextResponse) {

    const subCategory = req.nextUrl.searchParams.get('sub') || "";
    const keyword = req.nextUrl.searchParams.get('keyword') || "";
    const Category = req.nextUrl.searchParams.get('cat') || "";
    const min = req.nextUrl.searchParams.get('min') || "";
    const max = req.nextUrl.searchParams.get('max') || "";
    const lastVisibleId = req.nextUrl.searchParams.get('lastVisible') as string
    const keywordsArray: string[] = keyword.split(' ').map(word => word.toLowerCase());

    let subcategory: any = false;
    let category: any = false;
    let categoryName: any = false;
    let data: any = [];

    categories.forEach((c) => {
        if (subCategory) {
            c.subcategories.forEach((sub) => {
                if (sub.id === subCategory) {
                    subcategory = sub.id;
                    category = c.id;
                }
            });
        } else if (Category && c.id === Category) {
            category = c.id;
        }
    });
    if (category) {
        categoryName = CategoryWNameDoc.find((c) => c.id === category)?.name || '';
    }

    try {
        let lastDocRef = null
        let lastVisible;
        let Query
        if (lastVisibleId !== "undefined") {
            const docRef = doc(db, categoryName || collections[0], lastVisibleId);
            lastDocRef = await getDoc(docRef);
        }
        if (subcategory) {
            if (keyword) {
                if (min || max) {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3)
                        );
                } else {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("keywords", "array-contains-any", keywordsArray),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("keywords", "array-contains-any", keywordsArray),
                            orderBy('created_at'),
                            limit(3)
                        );
                }
            } else {
                if (min || max) {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3)
                        );
                } else {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("subCategoryId", "==", subcategory),
                            orderBy('created_at'),
                            limit(3)
                        );
                }
            }
        } else if (category) {
            if (keyword) {
                if (min || max) {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3)
                        );

                } else {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("keywords", "array-contains-any", keywordsArray),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("keywords", "array-contains-any", keywordsArray),
                            orderBy('created_at'),
                            limit(3)
                        );
                }
            } else {
                if (min || max) {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('created_at'),
                            limit(3)
                        );
                } else {
                    Query = lastDocRef ?
                        query(
                            collection(db, categoryName || collections[0]),
                            orderBy('created_at'),
                            limit(3),
                            startAfter(lastDocRef)
                        ) :
                        query(
                            collection(db, categoryName || collections[0]),
                            orderBy('created_at'),
                            limit(3)
                        );
                }
            }
        }
        if (typeof Query === 'undefined') return NextResponse.json({ data: null, lastVisible: null });
        const querySnapshot = await getDocs(Query);
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });
        if (querySnapshot.docs.length > 0) {
            lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
        return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

    } catch (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}