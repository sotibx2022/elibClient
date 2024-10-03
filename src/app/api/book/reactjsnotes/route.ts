import { connectToDB } from "@/config/db";
import { reactjsNote } from "@/model/reactjsNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all reactjs Notes from the database
    const allreactjsNotes = await reactjsNote.find();
    // Check if any notes were found
    if (!allreactjsNotes || allreactjsNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No reactjs Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All reactjs Notes Found Successfully",
      data: allreactjsNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch reactjs Notes",
    });
  }
}
