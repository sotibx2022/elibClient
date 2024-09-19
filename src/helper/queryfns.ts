import axios from "axios"
export const getAllBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book');
    return response.data.allBooks;
}
export const getSingleBook = async(bookId:string)=>{
    const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
    return response.data.singleBook;
}