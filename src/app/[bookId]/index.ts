import axios from "axios";
import { BookDisplay } from "../types/types";
export interface SingleBookResponse {
  message: string;
  status: number;
  singleBook?: BookDisplay;
}
export const getSingleBook = async (queryKey:string, bookId: string): Promise<SingleBookResponse> => {
  if (queryKey.includes('html')){
    
  }
    try {
      const response = await axios.get<SingleBookResponse>(`http://localhost:3000/api/${bookId}`);
      return response.data;
    } catch (error) {
      // Handle the error
      console.error("Error fetching the single book:", error);
      return {
        message: "An error occurred while fetching the book.",
        status: 500, // or some other error code
      };
    }
}