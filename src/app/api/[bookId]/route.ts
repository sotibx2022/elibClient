import cloudinary from "@/config/cloudinary";
import { connectToDB } from "@/config/db";
import { generatePublicPath } from "@/helper/generatePublicPath";
import { uploadFile } from "@/helper/upload";
import { authentication } from "@/middleware/authenticate";
import { Books } from "@/model/bookModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest, res:NextResponse){
    connectToDB()
    try {
        const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const bookId = pathSegments.pop();
        const formData = await req.formData()
        const userId = authentication(req,res)
        const title = formData.get('title');
    const description = formData.get('description');
    const author = formData.get('author');
    const genre = formData.get('genre');
    const coverImage = formData.get('coverImage') as unknown as File;
    const pdf = formData.get('pdf') as unknown as File;
    let pdfUrl= "";
    let imageUrl = "";
        const book = await Books.findById(bookId);
        if (!book) {
            return NextResponse.json({ message: "Book not found", status:404, success:false });
        }
        if (pdf) {
            const{secureUrl,message,success,status} = await uploadFile(pdf, "bookPdfs", "pdf");
            if(secureUrl){
                pdfUrl = secureUrl
            }
            const filePublicPath = generatePublicPath(book.file);
            if (filePublicPath) {
                try {
                    const result = await cloudinary.uploader.destroy(filePublicPath, {
                        resource_type: 'raw' 
                    });
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        }
        if (coverImage) {
            const {secureUrl,message,success,status} = await uploadFile(coverImage, "coverImages", "any");
            if(secureUrl){
                imageUrl = secureUrl
            }
            const imagePublicPath = generatePublicPath(book.coverImage);
            console.log(imagePublicPath);
            if(imagePublicPath){
                try {
                    const result = await cloudinary.uploader.destroy(imagePublicPath);  
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    } else {
                        console.error("Unknown error occurred while deleting the file");
                    }
                }
            }
        }
        // Fetch existing book details
if(userId !== book.user.toString()){
    return NextResponse.json({status:401,message:"User Not autorized", success:false})
}
        // Update the book with the new or existing values
        const updatedBook = await Books.findOneAndUpdate(
            { _id: bookId },
            {
                title,
                genre,
                description,
                author,
                coverImage: imageUrl || book.coverImage,
                file: pdfUrl || book.file
            },
            { new: true }
        );
        return NextResponse.json({message:"Book Updated Successfully", status:200, success:true});
    } catch (error) {
        return NextResponse.json({message:"Error To Update Book", success:false,status:500})
    }
};
export async function GET (req: NextRequest, res: NextResponse){
    connectToDB()
    try {
        const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const bookId = pathSegments.pop();
        const singleBook = await Books.findOne({ _id: bookId }).populate('user', 'name email');
        if (!singleBook) {
            return NextResponse.json({status:404, message:"Book Not Found",success:false}); // Use 404 for not found
        }
        return NextResponse.json({ status: 200, message: "Single Book Found", singleBook });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({status:500, message:"Error Fetching Book", success:false}); // Use 500 for server errors
    }
}
export async function DELETE (req: NextRequest, res: NextResponse){
    connectToDB()
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const bookId = pathSegments.pop();
    try {
      // Find the book by ID
      const singleBook = await Books.findById(bookId);
      // If book is not found, return an error
      if (!singleBook) {
        return NextResponse.json({status:404, message:"Book to delete not found",success:false});
      }
      const userId = authentication(req,res)
      // Check if the user is authorized to delete the book
      if (userId!== singleBook.user.toString()) {
        return NextResponse.json({status:403,success:false, message:"You are not authorized to delete this book"});
      }
      // Delete the cover image from Cloudinary
      try {
        let imagePublicPath = generatePublicPath(singleBook.coverImage);
        if(imagePublicPath){
            await cloudinary.uploader.destroy(imagePublicPath);
        }
      } catch (error) {
        return NextResponse.json({status:500, message:"Error deleting Cloudinary cover image", success:false});
      }
      // Delete the PDF file from Cloudinary
      try {
        let pdfPublicPath = generatePublicPath(singleBook.file);
        if(pdfPublicPath){
            await cloudinary.uploader.destroy(pdfPublicPath);
        }
      } catch (error) {
        return NextResponse.json({status:500, message:"Error deleting Cloudinary file", success:false});
      }
      // Delete the book from the database
      try {
        await singleBook.deleteOne(); // Use `deleteOne` instead of `delete` (better semantic)
      } catch (error) {
        return NextResponse.json({status:500, message:"Error deleting book from the database", success:false});
      }
      // Respond with a success message
      return NextResponse.json({ message: "Book deleted successfully", status: 200, success: true });
    } catch (error) {
      // Handle any unexpected errors
      return NextResponse.json({status:500, message:"Error deleting book from the database", success:false});
    }
  };
