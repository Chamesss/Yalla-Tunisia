"use server"
//Error codes:{ title=1 / price=2 / qte=3 / description=4 / materialsUsed=5 / category=11 / subcategory=12 / location=13 / pictures=22}

import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { app, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadImages } from "./uploadPictures";

export async function createHandmadeListing(prevState: any, formData: FormData) {

    const title = formData.get('title')
    const price = formData.get('price');
    const qte = formData.get('qte')
    const description = formData.get('description')
    const materialsUsed = formData.get('materialsUsed')
    const xs = formData.get('size-xs')
    const sm = formData.get('size-sm')
    const md = formData.get('size-md')
    const lg = formData.get('size-lg')
    const xl = formData.get('size-xl')
    const xxl = formData.get('size-xxl')
    const width = formData.get('width')
    const height = formData.get('height')
    const colors = formData.getAll('colors')
    const productImages = formData.getAll('productImages')
    const userId = formData.get('userId') as string
    const categoryId = formData.get('categoryId') as string
    const subCategoryId = formData.get('subCategoryId') as string
    const location = (formData.get('location') as string).toLocaleLowerCase()

    if (!categoryId) return { response: { success: false, error: 11, message: "invalid category" } }
    if (!subCategoryId) return { response: { success: false, error: 12, message: "invalid subCategoryId" } }
    if (!location) return { response: { success: false, error: 13, message: "invalid location" } }

    if (title) {
        if (title.toString().length < 3) {
            return { response: { success: false, error: 1, message: "title must be greater then 3 characters" } }
        }
        if (title.toString().length > 35) {
            return { response: { success: false, error: 1, message: "title must be less then 35 characters" } }
        }
    } else {
        return { response: { success: false, error: 1, message: "insert a valid title" } }
    }

    if (price) {
        if (Number(price) < 1) {
            return { response: { success: false, error: 2, message: "price must be greater then 1DT" } }
        }
        if (Number(price) > 99999) {
            return { response: { success: false, error: 2, message: "what are you trying to sell?" } }
        }
    } else {
        return { response: { success: false, error: 2, message: "insert a valid price" } }
    }

    if (qte) {
        if (Number(qte) < 1) {
            return { response: { success: false, error: 3, message: "enter a valid qte." } }
        }
        if (Number(qte) > 999) {
            return { response: { success: false, error: 3, message: "max qte 999 exceeded" } }
        }
    } else {
        return { response: { success: false, error: 3, message: "enter a valid qte." } }
    }

    if (description) {
        if (description.toString().length < 3) {
            return { response: { success: false, error: 4, message: "description must be greater then 3 characters." } }
        }
        if (description.toString().length > 255) {
            return { response: { success: false, error: 4, message: "description must be less then 25 characters" } }
        }
    } else {
        return { response: { success: false, error: 4, message: "enter valid description" } }
    }

    if (materialsUsed) {
        if (materialsUsed.toString().length < 3) {
            return { response: { success: false, error: 5, message: "enter valid materials" } }
        }
        if (materialsUsed.toString().length > 35) {
            return { response: { success: false, error: 5, message: "materials used must be less then 35 characters" } }
        }
    } else {
        return { response: { success: false, error: 5, message: "enter valid materials" } }
    }

    if (!userId) {
        return { response: { success: false, error: 10, message: "userId is missing?" } }
    }
    //@ts-ignore
    if (!productImages[0].size) {
        return { response: { success: false, error: 22, message: "upload at least 1 picture" } }
    }

    const sizes = [xs, sm, md, lg, xl, xxl]
    const dimensions = [width, height]
    const imageUrls = await uploadImages(productImages, userId, getStorage, uploadBytes, getDownloadURL, app, storageRef)

    const data = {
        userId,
        title,
        price,
        qte,
        description,
        materialsUsed,
        sizes,
        dimensions,
        colors,
        imageUrls,
        categoryId,
        subCategoryId,
        location,
        status: false,
        disabled: false
    }

    const handmadeRef = doc(collection(db, "Handmades"));
    await setDoc(handmadeRef, data);

    return {
        response: {
            success: true,
            error: 0,
            message: ""
        }
    };
};

