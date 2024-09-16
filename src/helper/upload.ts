import path from "node:path";
import { unlink } from "node:fs/promises";
import createHttpError from "http-errors";
import cloudinary from "@/config/cloudinary";
export const uploadFile = async (file: File, folder: string, fileType:string) => {
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
            return secureUrl;
        } else {
            throw new createHttpError.InternalServerError("File upload failed");
        }
    } catch (error) {
        if (error instanceof Error) {
            throw  createHttpError.InternalServerError(`Error during file upload: ${error.message}`);
        } else {
            throw  createHttpError(500, "Unknown error occurred");
        }
    }
};