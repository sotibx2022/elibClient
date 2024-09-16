import createHttpError from 'http-errors';
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/helper/upload';
import { Books } from '@/model/bookModel';
import { authentication } from '@/middleware/authenticate';

export async function POST (req: NextRequest, res: NextResponse) {
    const formData = await req.formData()
    const userId = authentication(req,res)
    const title = formData.get('title');
const description = formData.get('description');
const author = formData.get('author');
const genre = formData.get('genre');
const coverImage = formData.get('coverImage') as unknown as File;
const pdf = formData.get('pdf') as unknown as File;
    // Check for required fields
    if (!title || !author || !genre || !description) {
        return NextResponse.json({ message: 'All fields are required', success: false });
    }
    try {
        let imageUrl: string = "";
        let pdfUrl: string = "";
        // Handling the 'pdf' field
        if (pdf) {
                pdfUrl = await uploadFile(pdf, "bookPdfs", "pdf");
            }
         else {
            return NextResponse.json({status:400, message:"No PDF file found", success:false});
        }
        // Handling the 'coverImage' field
        if (coverImage) {
            imageUrl = await uploadFile(coverImage, "coverImages", "any");
        } else {
            return NextResponse.json({status:400, message:"No cover image found", success:false});
        }
        // Create a new book entry in the database
        const newBook = await Books.create({
            title,
            author,
            user: userId,
            genre,
            description,
            coverImage: imageUrl,
            file: pdfUrl
        });
        return NextResponse.json({message:"Book Created Successfully", status:201, success:true}); // Send back the created book entry
    } catch (error) {
        return NextResponse.json({status:500, message:`Error creating book`, success:false});
    }
};
export async function GET(req:NextRequest, res:NextResponse) {
    try {
        const allBooks = await Books.find().populate('user', 'name email');
        return NextResponse.json({ status: 200, message: "Books Found Successfully", allBooks });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({status:500, message:"Error Fetching Books", success:false}); // Use 500 for server errors
    }
}
