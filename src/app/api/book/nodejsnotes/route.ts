import { connectToDB } from "@/config/db";
import { nodejsNote } from "@/model/nodejsNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response:NextResponse) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all nodejs Notes from the database
    const allnodejsNotes = await nodejsNote.find();
    // Check if any notes were found
    if (!allnodejsNotes || allnodejsNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No nodejs Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All nodejs Notes Found Successfully",
      data: allnodejsNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch nodejs Notes",
    });
  }
}
