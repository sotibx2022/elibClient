import { connectToDB } from "@/config/db";
import { mongodbNote } from "@/model/MongoDbNotesModel";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Fetch all mongodb Notes from the database
    const allMongoDbNotes = await mongodbNote.find();
    // Check if any notes were found
    if (!allMongoDbNotes || allMongoDbNotes.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No mongodb Notes Found",
      });
    }
    // Return a success response with the retrieved data
    return NextResponse.json({
      success: true,
      status: 200,
      message: "All mongodb Notes Found Successfully",
      data: allMongoDbNotes
    });
  } catch (error) {
    // Handle any errors during the database operation
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch mongodb Notes",
    });
  }
}
