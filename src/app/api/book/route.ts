import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/helper/upload';
import { Books } from '@/model/bookModel';
import { authentication } from '@/middleware/authenticate';
import { connectToDB } from '@/config/db';
export async function POST(req: NextRequest, res: NextResponse) {
    connectToDB();
    const formData = await req.formData();
    const userId = authentication(req, res);
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
            const { secureUrl, status, message, success } = await uploadFile(pdf, "bookPdfs", "pdf");
            if (secureUrl) {
                pdfUrl = secureUrl;
            }else{
                return NextResponse.json({ status, message, success });
            }
        }
        // Handling the 'coverImage' field
        if (coverImage) {
            const { secureUrl, status, message, success } = await uploadFile(coverImage, "coverImages", "any");
            if (secureUrl) {
                imageUrl = secureUrl;
            }else{
                return NextResponse.json({ status, message, success });
            }
        }
        // Create a new book entry in the database
        const newBook = await Books.create({
            title,
            author,
            user: userId,
            genre,
            description,
            coverImage: imageUrl,
            file: pdfUrl,
        });
        return NextResponse.json({ message: "Book Created Successfully", status: 201, success: true }); // Send back the created book entry
    } catch (error) {
        return NextResponse.json({ status: 500, message: `Error creating book`, success: false });
    }
};
export async function GET(req:NextRequest, res:NextResponse) {
    try {
        await connectToDB();
        const allBooks = await Books.find();
        return NextResponse.json({ status: 200, message: "Books Found Successfully", allBooks });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({status:500, message:"Error Fetching Books", success:false}); // Use 500 for server errors
    }
}
