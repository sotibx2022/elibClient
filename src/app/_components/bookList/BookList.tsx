import React from 'react'
import SingleBook from '../singleBook/SingleBook'
import { fetchBooks } from '.';
import { BookDisplay } from '@/app/types/types';
interface APIResponse{
  message:string,
  success:boolean,
  status:number,
  allBooks:[],
}
const BookList = async() => {
  const result:APIResponse = await fetchBooks();
  if(!result){
    return <h1>No Books Found</h1>
  }
  return (
    <div className='flex justify-between flex-wrap'>
      {result && result.allBooks.map((book:BookDisplay) => (
        <SingleBook key={book._id} {...book} />
      ))}
    </div>
  )
}
export default BookList;
