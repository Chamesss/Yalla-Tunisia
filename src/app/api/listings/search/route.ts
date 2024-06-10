import { CategoryWNameDoc, categories } from "@/constants/categories";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";  // Adjust the import path as needed
import { collection, query, where, getDocs, orderBy, startAfter, limit } from "firebase/firestore";

const collections = ["Handmades", "Guides", "Sports"];

export async function GET(req: NextRequest, res: NextResponse) {

    console.log('API called');

    const subCategory = req.nextUrl.searchParams.get('sub') || "";
    const keyword = req.nextUrl.searchParams.get('keyword') || "";
    const Category = req.nextUrl.searchParams.get('cat') || "";
    const min = req.nextUrl.searchParams.get('min') || "";
    const max = req.nextUrl.searchParams.get('max') || "";
    const pageSize = parseInt(req.nextUrl.searchParams.get('limit') || "10", 10);
    const lastVisibleId = req.nextUrl.searchParams.get('lastVisible') || null;

    const keywordsArray: string[] = keyword.split(' ').map(word => word.toLowerCase());

    let subcategory: any = false;
    let category: any = false;
    let categoryName: any = false;

    if (subCategory) {
        categories.forEach((c) => {
            c.subcategories.forEach((sub) =>
                sub.id === subCategory && (subcategory = sub.id, category = c.id)
            );
        });
        if (category) {
            categoryName = CategoryWNameDoc.find((c) => c.id === category)?.name || '';
        }
    } else {
        if (Category) {
            categories.forEach((c) => c.id === Category && (category = c.id));
            categoryName = CategoryWNameDoc.find((c) => c.id === category)?.name || '';
        }
    }

    let data: any = [];
    let q;

    try {
        const lastDocSnapshot = lastVisibleId ? await getDocs(query(collection(db, categoryName || collections[0]), orderBy('title'), limit(1), startAfter(lastVisibleId))) : null;
        const lastVisibleDoc = lastDocSnapshot && !lastDocSnapshot.empty ? lastDocSnapshot.docs[0] : null;

        if (subcategory) {
            if (keyword) {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("keywords", "array-contains-any", keywordsArray),
                        where("price", ">=", min),
                        where("price", "<=", max),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("keywords", "array-contains-any", keywordsArray),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                }
            } else {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("price", ">=", min),
                        where("price", "<=", max),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                }
            }
        } else if (category) {
            if (keyword) {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("keywords", "array-contains-any", keywordsArray),
                        where("price", ">=", min),
                        where("price", "<=", max),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where('title', ">=", keyword),
                        where('title', '<', keyword + '~'),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                }
            } else {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("price", ">=", min),
                        where("price", "<=", max),
                        orderBy('title'),
                        limit(pageSize),
                        startAfter(lastVisibleDoc)
                    );
                } else {
                    q = query(collection(db, categoryName), orderBy('title'), limit(pageSize), startAfter(lastVisibleDoc));
                }
            }
        } else {
            for (const coll of collections) {
                if (keyword) {
                    if (min || max) {
                        const collectionQuery = query(
                            collection(db, coll),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('title'),
                            limit(pageSize),
                            startAfter(lastVisibleDoc)
                        );
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                    } else {
                        const collectionQuery = query(
                            collection(db, coll),
                            where("keywords", "array-contains-any", keywordsArray),
                            orderBy('title'),
                            limit(pageSize),
                            startAfter(lastVisibleDoc)
                        );
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                    }
                } else {
                    if (min || max) {
                        const collectionQuery = query(
                            collection(db, coll),
                            where("price", ">=", min),
                            where("price", "<=", max),
                            orderBy('title'),
                            limit(pageSize),
                            startAfter(lastVisibleDoc)
                        );
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                    } else {
                        console.log('here ?')
                        const collectionQuery = query(collection(db, coll), orderBy('created_at'), limit(10), startAfter(lastVisibleDoc));
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                    }
                }
            }
        }

        let lastVisible;
        if (data.length > 0) {
            lastVisible = data[data.length - 1];
        }

        return NextResponse.json({ data, lastVisible });

    } catch (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}