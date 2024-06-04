import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {

    const subCategory = req.nextUrl.searchParams.get('sub') || "";
    const keyword = req.nextUrl.searchParams.get('keyword') || "";
    const category = req.nextUrl.searchParams.get('cat') || "";
    const min = req.nextUrl.searchParams.get('min') || "";
    const max = req.nextUrl.searchParams.get('max') || "";

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