export async function createHandmadeListing(prevState: any, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const size = ["xs", "sm", "md", "lg", "xl", "xxl"];

    const text = formData.get('text') as string;

    const xs = formData.get('size-xs') as string;
    const sm = formData.get('size-sm') as string;
    const md = formData.get('size-md') as string;
    const lg = formData.get('size-lg') as string;
    const xl = formData.get('size-xl') as string;
    const xxl = formData.get('size-xxl') as string;


    console.log('form xs === ', xs)
    console.log('form sm === ', sm)
    console.log('form md === ', md)
    console.log('form lg === ', lg)
    console.log('form xl === ', xl)
    console.log('form xxl === ', xxl)

    console.log('form text === ', text)
};

