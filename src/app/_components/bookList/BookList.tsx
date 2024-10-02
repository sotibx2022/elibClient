import React from 'react'
import SingleBook from '../singleBook/SingleBook'
import { fetchBooks } from '.';
import { BookDisplay } from '@/app/types/types';
import Link from 'next/link';
import LinkComponent from '../link/LinkComponent';
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
  <section className='container'>
    <h2 className='subHeading'>Popular Books</h2>
    <div className=' flex justify-between flex-wrap'>
      {result && result.allBooks.splice(0,6).map((book:BookDisplay) => (
        <SingleBook key={book._id} {...book} />
      ))}
    </div>
    <div className=' w-full flex justify-end text-helper text-underline'>
      <LinkComponent href='/books' text='Check All Books'/>
    </div>
    </section>
  )
}
export default BookList;
