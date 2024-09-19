import { BookCreate } from "@/app/types/types";
import { APIResponse } from "./mutation";
import axios from "axios";
export const findAccessToken =() =>{
    const token = localStorage.getItem('accessToken')
    return token
}
// Reusable function for creating or updating a book
export const createBook = async (data: BookCreate, bookId?: string): Promise<APIResponse> => {
  try {
    const token = findAccessToken(); // Get the access token
    // Create form data with the book information
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('genre', data.genre);
    formData.append('description', data.description);
    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]); // assuming this is a file object
    }
    if (data.file && data.file[0]) {
      formData.append('pdf', data.file[0]); // assuming this is a PDF file
    }
    // Determine the request method and URL based on whether a bookId is provided
    const url = bookId ? `http://localhost:3000/api/books/${bookId}` : 'http://localhost:5232/api/books';
    const method = bookId ? 'put' : 'post'; // Use 'PUT' for updating, 'POST' for creating
    // Make the request
    const response = await axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'multipart/form-data'
      },
    });
    // Log and return the response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors properly
    return {
      message: bookId ? "There was an error updating the book" : "There was an error creating the book",
      success: false,
      status: 400,
    };
  }
};
export const deleteBook = async(bookId:string):Promise<APIResponse>=>{
  try {
    const token = findAccessToken();
    const response = await axios.delete(`http://localhost:3000/api/books/${bookId}`,{
     headers: {
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    })
    return response.data
  } catch (error) {
    return {
      message:"There is some Probelm to delete the book",
      status:400,
success:true,
    }
  }
}