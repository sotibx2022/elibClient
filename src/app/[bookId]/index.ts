import axios from "axios";
import { Book } from "../_components/bookList";
export interface SingleBookResponse {
  message: string;
  status: number;
  singleBook: Book;
}
export const getSingleBook = async (bookId: string): Promise<SingleBookResponse> => {
    try {
      const response = await axios.get<SingleBookResponse>(`${process.env.API_URL}/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      // Handle the error
      console.error("Error fetching the single book:", error);
      return {
        message: "An error occurred while fetching the book.",
        status: 500, // or some other error code
        singleBook: {} as Book // Return a default empty book object or handle it accordingly
      };
    }
}