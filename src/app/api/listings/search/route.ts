import { CategoryWNameDoc, categories } from "@/constants/categories";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";  // Adjust the import path as needed
import { collection, query, where, getDocs, orderBy, startAfter, limit, doc, getDoc } from "firebase/firestore";

const collections = ["Handmades", "Guides", "Sports"];

export async function GET(req: NextRequest, res: NextResponse) {

    console.log('API called');

    const subCategory = req.nextUrl.searchParams.get('sub') || "";
    const keyword = req.nextUrl.searchParams.get('keyword') || "";
    const Category = req.nextUrl.searchParams.get('cat') || "";
    const min = req.nextUrl.searchParams.get('min') || "";
    const max = req.nextUrl.searchParams.get('max') || "";
    const lastVisibleId = req.nextUrl.searchParams.get('lastVisible') as string

    console.log("sub == ", subCategory)

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

        let lastDocRef = null

        if (lastVisibleId !== "undefined") {
            const docRef = doc(db, categoryName || collections[0], lastVisibleId);
            lastDocRef = await getDoc(docRef);
        }

        if (subcategory) {
            if (keyword) {
                if (min || max) {

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                } else {

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                }
            } else {
                if (min || max) {

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                } else {

                    console.log('here ??')

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });
                }
            }
        } else if (category) {
            if (keyword) {
                if (min || max) {
                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                } else {

                    console.log(keywordsArray)

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                }
            } else {
                if (min || max) {
                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });

                } else {

                    const Query = lastDocRef ?
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

                    const querySnapshot = await getDocs(Query);

                    querySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    let lastVisible;
                    if (querySnapshot.docs.length > 0) {
                        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    return NextResponse.json({ data, lastVisible: lastVisible ? lastVisible.id : null });
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


// else {
//     for (const coll of collections) {
//         if (keyword) {
//             if (min || max) {
//                 const collectionQuery = query(
//                     collection(db, coll),
//                     where("keywords", "array-contains-any", keywordsArray),
//                     where("price", ">=", min),
//                     where("price", "<=", max),
//                     orderBy('title'),
//                     limit(pageSize),
//                     startAfter(lastVisibleDoc)
//                 );
//                 const querySnapshot = await getDocs(collectionQuery);
//                 querySnapshot.forEach((doc) => {
//                     data.push({
//                         id: doc.id,
//                         ...doc.data()
//                     });
//                 });
//             } else {
//                 const collectionQuery = query(
//                     collection(db, coll),
//                     where("keywords", "array-contains-any", keywordsArray),
//                     orderBy('title'),
//                     limit(pageSize),
//                     startAfter(lastVisibleDoc)
//                 );
//                 const querySnapshot = await getDocs(collectionQuery);
//                 querySnapshot.forEach((doc) => {
//                     data.push({
//                         id: doc.id,
//                         ...doc.data()
//                     });
//                 });
//             }
//         } else {
//             if (min || max) {
//                 const collectionQuery = query(
//                     collection(db, coll),
//                     where("price", ">=", min),
//                     where("price", "<=", max),
//                     orderBy('title'),
//                     limit(pageSize),
//                     startAfter(lastVisibleDoc)
//                 );
//                 const querySnapshot = await getDocs(collectionQuery);
//                 querySnapshot.forEach((doc) => {
//                     data.push({
//                         id: doc.id,
//                         ...doc.data()
//                     });
//                 });
//             } else {
//                 console.log('here ?')
//                 const collectionQuery = query(collection(db, coll), orderBy('created_at'), limit(10), startAfter(lastVisibleDoc));
//                 const querySnapshot = await getDocs(collectionQuery);
//                 querySnapshot.forEach((doc) => {
//                     data.push({
//                         id: doc.id,
//                         ...doc.data()
//                     });
//                 });
//             }
//         }
//     }
// }