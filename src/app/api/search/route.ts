import { connectToDB } from "@/config/db";
import { Books } from "@/model/bookModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
    // Connect to the database
    try {
        await connectToDB();
    } catch (error) {
        return NextResponse.json({
            message: "Database connection error",
            success: false,
            status: 500,
        });
    }
    try {
        // Extracting the search value from the request URL
        const url = new URL(request.url);
        const searchValue = url.searchParams.get('searchValue') || ''; // Get searchValue from query parameters
        const filteredBooks = await Books.find({
            $or: [
                { genre: { $regex: new RegExp(searchValue, 'i') } }, // Case-insensitive search for genre
                { title: { $regex: new RegExp(searchValue, 'i') } }  // Case-insensitive search for title
            ]
        });
        return NextResponse.json({
            message: "Filtered Books Found successfully",
            success: true,
            status: 200,
            filteredBooks
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching books",
            success: false,
            status: 500,
        });
    }
}
