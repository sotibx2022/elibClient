import axios from "axios"
export const getAllBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book');
    return response.data.allBooks;
}
export const getSingleBook = async(bookId:string)=>{
    const response = await axios.get(`http://localhost:3000/api/${bookId}`);
    return response.data.singleBook;
}
export const getAllHTMLBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/htmlnotes');
    return response.data.data
}