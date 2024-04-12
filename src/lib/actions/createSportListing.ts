"use server"

//Error codes:{ title=1 / price=2 / grpSize=3 / description=4 / duration=5 / timing=6 / days=7 / category=11 / subcategory=12 / location=13}

export async function createSportListing(prevState: any, formData: FormData) {

    const title = formData.get('title')
    const price = formData.get('price');
    const grpSize = formData.get('qte')
    const description = formData.get('description')
    const duration = formData.get('duration')
    const eventType = formData.get('eventType')
    const days = formData.get('days') as string
    const timing = formData.get('timing')
    const productImages = formData.getAll('productImages')
    const restrictionLength = formData.get('restrictionLength')
    let restrictions = [];
    for (let i = 0; i < Number(restrictionLength); i++) {
        restrictions.push(formData.get(`restriction-${i}`))
    }
    const userId = formData.get('userId') as string
    const categoryId = formData.get('categoryId') as string
    const subCategoryId = formData.get('subCategoryId') as string
    const location = formData.get('location') as string

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

    if (grpSize) {
        if (Number(price) < 1) {
            return { response: { success: false, error: 3, message: "group size must be greater then 1" } }
        }
        if (Number(price) > 99) {
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
        if (Number(price) > 12) {
            return { response: { success: false, error: 5, message: "we think that's a lot" } }
        }
    } else {
        return { response: { success: false, error: 5, message: "insert a valid duration" } }
    }

    let daysArray: Date[]

    if (eventType === 'OngoingEvent') {
        if (timing === null) {
            return { response: { success: false, error: 6, message: "pick program timing" } }
        }
    } else {
        if (days) {
            daysArray = days.split(",").map(dateString => new Date(dateString));
        } else {
            return { response: { success: false, error: 7, message: "pick program days" } }
        }
    }









    return {
        response: {
            success: true,
            error: 0,
            message: ""
        }
    };

}