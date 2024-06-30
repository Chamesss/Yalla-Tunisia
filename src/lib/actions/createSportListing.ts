"use server"

import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { app, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadImages } from "./uploadPictures";
import getBusinessName from "../ListingActions/getBusinessName";

//Error codes:{ title=1 / price=2 / grpSize=3 / description=4 / duration=5 / timing=6 / days=7 / category=11 / subcategory=12 / location=13}

export async function createSportListing(prevState: any, formData: FormData) {

    const title = formData.get('title') as string
    const price = formData.get('price');
    const grpSize = formData.get('grpSize')
    const description = formData.get('description')
    const duration = formData.get('duration')
    const eventType = formData.get('eventType')
    const days = formData.get('days') as string
    const timingValue = formData.get('timing')
    const productImages = formData.getAll('productImages')
    const restrictionLength = formData.get('restrictionLength')
    const locationValue = (formData.get('location') as string)
    let restrictions: string[] = [];
    for (let i = 0; i < Number(restrictionLength); i++) {
        restrictions.push(formData.get(`restriction-${i}`) as string)
    }
    const userId = formData.get('userId') as string
    const categoryId = formData.get('categoryId') as string
    const subCategoryId = formData.get('subCategoryId') as string

    if (!categoryId) return { response: { success: false, error: 11, message: "invalid category" } }
    if (!subCategoryId) return { response: { success: false, error: 12, message: "invalid subCategoryId" } }
    if (!locationValue) return { response: { success: false, error: 13, message: "invalid location" } }
    let location = locationValue.toLocaleLowerCase()

    if (location === "nan") {
        try {
            const business = await getBusinessName(userId) as Approvals
            location = business.locationId
        } catch (err) {
            console.log(err)
        }
    }

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

    if (grpSize) {
        if (Number(grpSize) < 1) {
            return { response: { success: false, error: 3, message: "group size must be greater then 1" } }
        }
        if (Number(grpSize) > 99) {
            return { response: { success: false, error: 3, message: "we think that's a lot" } }
        }
    } else {
        return { response: { success: false, error: 3, message: "insert a valid group size" } }
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

    if (duration) {
        if (Number(price) < 1) {
            return { response: { success: false, error: 5, message: "insert a valid duration" } }
        }
        if (Number(price) > 9999) {
            return { response: { success: false, error: 5, message: "we think that's a lot" } }
        }
    } else {
        return { response: { success: false, error: 5, message: "insert a valid duration" } }
    }

    let daysArray: Date[] = []
    let timing: string = ''

    if (eventType === 'OngoingEvent') {
        if (timingValue === null) {
            return { response: { success: false, error: 6, message: "pick program timing" } }
        } else {
            timing = timingValue as string
        }
    } else {
        if (days) {
            daysArray = days.split(",").map(dateString => new Date(dateString));
        } else {
            return { response: { success: false, error: 7, message: "pick program days" } }
        }
    }

    //@ts-ignore
    if (!productImages[0].size) {
        return { response: { success: false, error: 22, message: "upload at least 1 picture" } }
    }

    const imageUrls = await uploadImages(productImages, userId, getStorage, uploadBytes, getDownloadURL, app, storageRef)

    const keywordsArray: string[] = title.split(' ').map(word => word.toLowerCase());

    const SportRef = doc(collection(db, "Sports"));

    const data = {
        id: SportRef.id,
        userId,
        categoryId,
        subCategoryId,
        title,
        imageUrls,
        grpSize,
        description,
        price,
        duration,
        eventType,
        timing: eventType === 'OngoingEvent' ? timing : daysArray,
        restrictions,
        location,
        keywords: keywordsArray,
        status: false,
        disabled: false,
        created_at: new Date()
    };

    await setDoc(SportRef, data);


    return {
        response: {
            success: true,
            error: 0,
            message: ""
        }
    };

}