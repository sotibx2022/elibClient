import axios from 'axios';
// Define the type for the Book
export interface Book {
  _id: string;
  title: string;
  author:string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  genre: string;
  description: string;
  coverImage: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface APIResponse{
  status:number,
  message:string,
  allBooks:Book[]
}
export const fetchBooks = async (): Promise<APIResponse> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/book`); 
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Error fetching books');
  }
};
