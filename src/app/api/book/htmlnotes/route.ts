import { connectToDB } from "@/config/db";
import { HTMLNote } from "@/model/HTMLNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all HTML Notes from the database
    const allHTMLNotes = await HTMLNote.find();
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All HTML Notes Found Successfully",
      data: allHTMLNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    console.error("Error fetching HTML notes:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch HTML Notes",
    });
  }
}
