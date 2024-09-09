import React from 'react'
import SingleBook from '../singleBook/SingleBook'
import { APIResponse, fetchBooks } from '.';
import {Book} from '.'
const BookList = async() => {
  const result:APIResponse = await fetchBooks();
  if(!result){
    return <h1>No Books Found</h1>
  }
  return (
    <div className='flex justify-between flex-wrap'>
      {result && result.allBooks.map((book) => (
        <SingleBook key={book._id} {...book} />
      ))}
    </div>
  )
}
export default BookList;
