import { connectToDB } from "@/config/db";
import { CssNote } from "@/model/CssNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all CSS Notes from the database
    const allCssNotes = await CssNote.find();
    // Check if any notes were found
    if (!allCssNotes || allCssNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No CSS Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All CSS Notes Found Successfully",
      data: allCssNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch CSS Notes",
    });
  }
}