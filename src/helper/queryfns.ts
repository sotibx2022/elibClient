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
export const getAllCssBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/cssnotes');
    return response.data.data
}
export const getAllJsBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/jsnotes');
    return response.data.data
}
export const getAllMongodbBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/mongodbnotes');
    return response.data.data
}
export const getAllGsapBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/gsapnotes');
    return response.data.data
}
export const getAllNextjsBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/nextjsnotes');
    return response.data.data
}
export const getAllNodejssBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/nodejsnotes');
    return response.data.data
}
export const getAllReactBooks = async() =>{
    const response = await axios.get('http://localhost:3000/api/book/reactnotes');
    return response.data.data
}