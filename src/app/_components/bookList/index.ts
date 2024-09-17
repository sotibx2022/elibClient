import axios from "axios";

export const fetchBooks = async()=>{
    try {
      const response = await axios.get(process.env.API_URL!);
      return response.data;
    } catch (error) {
      throw new Error("Error to Fetch Data from DB.")
    }
    }