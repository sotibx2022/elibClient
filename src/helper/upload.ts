import path from "node:path";
import { unlink } from "node:fs/promises";
import cloudinary from "@/config/cloudinary";
import { NextResponse } from "next/server";
interface UplaodResponse{
    message:string,
    status:number,
    success:boolean,
    secureUrl?:string,
}
export const uploadFile = async (file: File, folder: string, fileType:string):Promise<UplaodResponse> => {
    const fileName = file.name;
    const filePath = path.resolve(__dirname, "../../public/assets/uploads", fileName);
    try {
        // Upload the file to Cloudinary
        const uploadCoverImageResult = await cloudinary.uploader.upload(filePath, {
            resource_type: fileType === "pdf" ? "raw" : undefined,
            filename_override: fileName,
            folder: folder, // Use the provided folder dynamically
            format: file.type.split('/')[1],  // Get file extension from mimetype
        });
        if (uploadCoverImageResult) {
            const secureUrl = uploadCoverImageResult.secure_url;
            // Delete the local file after a successful upload
            await unlink(filePath);
            return {
                message:"File Uploaded Successfully",
                status:200, 
                success:true,
                secureUrl
            };
        } else {
            return {message:"file Upload Failed", status:400, success:false}
        }
    } catch (error) {
        if (error instanceof Error) {
            return {message:"Error While Uploading File", success:false, status:500}
        } else {
            throw  {status:500, message:"Unknown error occurred", success:false};
        }
    }
};