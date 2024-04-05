"use server"
//Error codes 1=title 2=price 3=qte 4=description 5=materialsUsed
const errorCode = [1, 2, 3, 4, 5, 6, 7]

export async function createHandmadeListing(prevState: any, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 250));

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


    console.log('form xs === ', xs)
    console.log('form sm === ', sm)
    console.log('form md === ', md)
    console.log('form lg === ', lg)
    console.log('form xl === ', xl)
    console.log('form xxl === ', xxl)

    return {
        response: {
            success: true,
            error: 0,
            message: "Form data processed"
        }
    };

};

