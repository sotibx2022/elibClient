import { connectToDB } from "@/config/db";
import { nextjsNote } from "@/model/nextjsNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all nextjs Notes from the database
    const allnextjsNotes = await nextjsNote.find();
    // Check if any notes were found
    if (!allnextjsNotes || allnextjsNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No nextjs Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All nextjs Notes Found Successfully",
      data: allnextjsNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch nextjs Notes",
    });
  }
}
