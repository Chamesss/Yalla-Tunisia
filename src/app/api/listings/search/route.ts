import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    // const { sub: subCategory = '', keyword = '', cat: category = '', min = '', max = '' } = req.query;

    console.log(req.nextUrl.searchParams.get("sub"))
    // const subCategory = searchParams.get('sub') || "";
    // const keyword = searchParams.get('keyword') || "";
    // const category = searchParams.get('cat') || "";
    // const min = searchParams.get('min') || "";
    // const max = searchParams.get('max') || "";

    // Log the parameters to verify
    // console.log({ subCategory, keyword, category, min, max });

    // Perform your fetch or database query using these parameters
    // Example: Fetch products from a database based on the query parameters
    let data = [];

    // if (subCategory) {
    //     // Fetch products by subcategory
    //     if (keyword) {
    //         // Add keyword filtering
    //     }
    // } else if (category) {
    //     // Fetch products by category
    //     if (keyword) {
    //         // Add keyword filtering
    //     }
    // } else if (keyword) {
    //     // Fetch products by keyword
    // } else {
    //     // Fetch random products
    // }

    // if (min) {
    //     // Add minimum price filtering
    // }
    // if (max) {
    //     // Add maximum price filtering
    // }
    return Response.json({ data: "hhhhh" });
}