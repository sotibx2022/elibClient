import axios from "axios";
import { BookDisplay } from "../types/types";
export interface SingleBookResponse {
  message: string;
  status: number;
  singleBook?: BookDisplay;
}
export const getSingleBook = async (_:string,bookId: string) => {
    console.log(bookId)
}