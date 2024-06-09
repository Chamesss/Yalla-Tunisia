import { CategoryWNameDoc, categories } from "@/constants/categories";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";  // Adjust the import path as needed
import { collection, query, where, getDocs } from "firebase/firestore";

const collections = ["Handmades", "Guides", "Sports"];


export async function GET(req: NextRequest, res: NextResponse) {
    const subCategory = req.nextUrl.searchParams.get('sub') || "";
    const keyword = req.nextUrl.searchParams.get('keyword') || "";
    const Category = req.nextUrl.searchParams.get('cat') || "";
    const min = req.nextUrl.searchParams.get('min') || "";
    const max = req.nextUrl.searchParams.get('max') || "";

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
        if (subcategory) {
            if (keyword) {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("keywords", "array-contains-any", keywordsArray),
                        where("price", ">=", min),
                        where("price", "<=", max)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("keywords", "array-contains-any", keywordsArray),
                    );
                }
            } else {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory),
                        where("price", ">=", min),
                        where("price", "<=", max)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where("subCategoryId", "==", subcategory)
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
                        where("price", "<=", max)
                    );
                } else {
                    q = query(
                        collection(db, categoryName),
                        where('title', ">=", keyword),
                        where('title', '<', keyword + '~'),
                        where('description', ">=", keyword),
                        where('description', '<', keyword + '~'),
                    );
                }
            } else {
                if (min || max) {
                    q = query(
                        collection(db, categoryName),
                        where("price", ">=", min),
                        where("price", "<=", max)
                    );
                } else {
                    q = query(collection(db, categoryName));
                }
            }
        } else {
            if (keyword) {
                if (min || max) {
                    for (const coll of collections) {
                        const collectionQuery = query(
                            collection(db, coll),
                            where("keywords", "array-contains-any", keywordsArray),
                            where("price", ">=", min),
                            where("price", "<=", max)
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
                    console.log('here')
                    for (const coll of collections) {
                        const collectionQuery = query(
                            collection(db, coll),
                            where("keywords", "array-contains-any", keywordsArray),
                        );
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });
                    }
                }
            } else {
                if (min || max) {
                    for (const coll of collections) {
                        const collectionQuery = query(collection(db, coll), where("price", ">=", min),
                            where("price", "<=", max));
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        });
                    }
                } else {
                    for (const coll of collections) {
                        const collectionQuery = query(collection(db, coll));
                        const querySnapshot = await getDocs(collectionQuery);
                        querySnapshot.forEach((doc) => {
                            data.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        });
                    }
                }
            }


            return Response.json(data);
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        });

    } catch (error) {
        console.error("Error fetching data: ", error);
        return Response.json(undefined);
    }

    return Response.json(data);
}
