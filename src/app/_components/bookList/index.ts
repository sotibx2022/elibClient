import axios from "axios";
export const fetchBooks = async()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/book");
      return response.data.allBooks;
    } catch (error) {
      throw new Error("Error to Fetch Data from DB.")
    }
    }