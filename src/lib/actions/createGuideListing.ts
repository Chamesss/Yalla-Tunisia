"use server"
//Error codes:{ title=1 / price=2 / description=3 / language=4 / materialsUsed=5 / category=11 / subcategory=12 / location=13}
export async function createGuideListing(prevState: any, formData: FormData) {

    const userId = formData.get('userId') as string
    const categoryId = formData.get('categoryId') as string
    const location = formData.get('location') as string
    const languageLength = formData.get('language-length')
    const paymentMethod = formData.get('paymentMethod')
    const priceHourly = formData.get('priceHourly')
    const priceTour = formData.get('priceTour')

    // if (!categoryId) return { response: { success: false, error: 11, message: "invalid category" } }
    // if (!location) return { response: { success: false, error: 13, message: "invalid location" } }
    //if (Number(languageLength) === 0) return { response: { success: false, error: 4, message: "select languages" } }
    if (paymentMethod === "hourly") {
        if (priceHourly) {
            if (Number(priceHourly) < 1) {
                return { response: { success: false, error: 2, message: "price must be greater then 1DT" } }
            }
            if (Number(priceHourly) > 99999) {
                return { response: { success: false, error: 2, message: "what are you trying to sell?" } }
            }
        } else {
            return { response: { success: false, error: 2, message: "insert a valid price" } }
        }
    } else {
        if (priceTour) {
            if (Number(priceTour) < 1) {
                return { response: { success: false, error: 2, message: "price must be greater then 1DT" } }
            }
            if (Number(priceTour) > 99999) {
                return { response: { success: false, error: 2, message: "what are you trying to sell?" } }
            }
        } else {
            return { response: { success: false, error: 2, message: "insert a valid price" } }
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