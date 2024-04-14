"use server"
//Error codes:{ title=1 / price=2 / description=4 / language=5 / timing=6 / days=7 / category=11 / subcategory=12 / location=13}
export async function createGuideListing(prevState: any, formData: FormData) {

    const title = formData.get('title')
    const description = formData.get('description')
    const userId = formData.get('userId') as string
    const categoryId = formData.get('categoryId') as string
    const location = formData.get('location') as string
    const languageLength = formData.get('language-length')
    const paymentMethodValue = formData.get('paymentMethod')
    const price = formData.get('price')
    const transportationValue = formData.get('transportation')
    const eventType = formData.get('eventType')
    const days = formData.get('days') as string
    const timing = formData.get('timing')
    const productImages = formData.getAll('productImages')
    const restrictionLength = formData.get('restrictionLength')

    const paymentMethodHourly = paymentMethodValue === 'hourly' ? true : false;
    const transportation = transportationValue === 'Transportation' ? true : false;
    let restrictions = [];
    for (let i = 0; i < Number(restrictionLength); i++) {
        restrictions.push(formData.get(`restriction-${i}`))
    }


    if (!categoryId) return { response: { success: false, error: 11, message: "invalid category" } }

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

    let languages = [];

    if (languageLength && Number(languageLength) > 0) {
        for (let i = 0; i < Number(languageLength); i++) {
            languages.push(formData.get(`language-${i}`))
        }
    } else {
        return { response: { success: false, error: 5, message: "select languages" } }
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