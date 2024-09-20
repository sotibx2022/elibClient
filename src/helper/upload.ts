import path from "node:path";
import { promises as fsPromises } from 'fs'; // for unlink
import fs from 'fs';
import cloudinary from "@/config/cloudinary";
interface UplaodResponse{
    message:string,
    status:number,
    success:boolean,
    secureUrl?:string,
}
export const uploadFile = async (file: File, folder: string, fileType: string): Promise<UplaodResponse> => {
    const fileName = file.name;
    const tempDir = path.resolve("C:/Users/1/Desktop/elibClient/elibclient/public/assets/uploads", folder); // Creating a folder dynamically
    const filePath = path.join(tempDir, fileName);
    // Ensure the directory exists before writing the file
    try {
        if (!fs.existsSync(tempDir)) {
            console.log(`Directory does not exist. Creating directory: ${tempDir}`);
            await fsPromises.mkdir(tempDir, { recursive: true }); // Creating the temporary folder
        }
        // Convert File object to Buffer and save it temporarily
        const arrayBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
        const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
        await fsPromises.writeFile(filePath, buffer); // Write the Buffer to file
        console.log(`File temporarily saved at: ${filePath}`);
    } catch (fileSaveError) {
        console.error("Error saving the file locally:", fileSaveError);
        return {
            message: "Failed to save the file locally.",
            status: 500,
            success: false,
        };
    }
    try {
        // Upload the file to Cloudinary
        const uploadCoverImageResult = await cloudinary.uploader.upload(filePath, {
            resource_type: fileType === "pdf" ? "raw" : undefined, // Set resource type to 'raw' for PDFs
            filename_override: fileName,
            folder: folder, // Use the provided folder dynamically
            format: file.type.split('/')[1], // Get file extension from mimetype
        });
        console.log("Cloudinary upload result:", uploadCoverImageResult);
        if (uploadCoverImageResult) {
            const secureUrl = uploadCoverImageResult.secure_url;
            // Log the Cloudinary secure URL
            console.log("File uploaded successfully to Cloudinary. Secure URL:", secureUrl);
            // Delete the local file after successful upload
            await fsPromises.unlink(filePath);
            console.log(`Local file deleted: ${filePath}`);
            // Remove the temporary folder as well
            await fsPromises.rm(tempDir, { recursive: true });
            console.log(`Temporary folder deleted: ${tempDir}`);
            return {
                message: "File Uploaded Successfully",
                status: 200,
                success: true,
                secureUrl,
            };
        } else {
            console.error("File upload failed at Cloudinary.");
            return {
                message: "File Upload Failed",
                status: 400,
                success: false,
            };
        }
    } catch (uploadError) {
        console.error("Error while uploading the file to Cloudinary:", uploadError);
        // Clean up if the upload fails
        await cleanupLocalFiles(filePath, tempDir);
        return {
            message: `Error While Uploading File`,
            status: 500,
            success: false,
        };
    }
};
// Helper function to clean up local files and directories
async function cleanupLocalFiles(filePath: string, tempDir: string) {
    try {
        if (fs.existsSync(filePath)) {
            await fsPromises.unlink(filePath);
            console.log(`Local file deleted during cleanup: ${filePath}`);
        }
        if (fs.existsSync(tempDir)) {
            await fsPromises.rm(tempDir, { recursive: true });
            console.log(`Temporary folder deleted during cleanup: ${tempDir}`);
        }
    } catch (cleanupError) {
        console.error("Error during cleanup:", cleanupError);
    }
}