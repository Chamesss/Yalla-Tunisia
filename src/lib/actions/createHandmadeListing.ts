
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

    if (!title) return { response: { error: 1, message: "title must be greater then 3" } }
    if (!price) return { response: { error: 2, message: "insert a valid price" } }
    if (!qte) return { response: { error: 3, message: "specify a qte" } }
    if (!description) return { response: { error: 4, message: "enter a valid description" } }
    if (!materialsUsed) return { response: { error: 5, message: "enter the used materials" } }


    console.log('form xs === ', xs)
    console.log('form sm === ', sm)
    console.log('form md === ', md)
    console.log('form lg === ', lg)
    console.log('form xl === ', xl)
    console.log('form xxl === ', xxl)
    console.log('form text === ')

    //console.log('form text === ', text)



    if (xs === null) {
        return {
            message: "xs is null"
        }
    }

    return {
        message: "Form data processed"
    }
};

