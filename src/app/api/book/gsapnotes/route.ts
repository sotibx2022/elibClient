import { connectToDB } from "@/config/db";
import { gsapNote } from "@/model/gsapNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response:NextResponse) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all gsapjs Notes from the database
    const allgsapjsNotes = await gsapNote.find();
    // Check if any notes were found
    if (!allgsapjsNotes || allgsapjsNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No gsapjs Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All gsapjs Notes Found Successfully",
      data: allgsapjsNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch gsapjs Notes",
    });
  }
}
