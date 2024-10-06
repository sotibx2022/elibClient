"use client"
import SingleBook from '../singleBook/SingleBook'
import { fetchBooks } from '.';
import { BookDisplay } from '@/app/types/types';
import LinkComponent from '../link/LinkComponent';
import { useQuery } from '@tanstack/react-query';
import Loading from "../loading/Loading"
interface APIResponse{
  message:string,
  success:boolean,
  status:number,
  allBooks:[],
}
const BookList = () => {
  const{data:books=[],isPending, error} = useQuery({queryKey:['books'],queryFn:fetchBooks})
  if(!books){
    return <h1>No Books Found</h1>
  }
  if(isPending){
    return <Loading/>
  }
  return (
  <section className='container'>
    <h2 className='subHeading'>Popular Books</h2>
    <div className='flex justify-between flex-wrap'>
    {books && books.map((book: BookDisplay) => {
        return <SingleBook key={book._id} {...book} />;
    })}
</div>
    <div className=' w-full flex justify-end text-helper text-underline'>
      <LinkComponent href='/books' text='Check All Books'/>
    </div>
    </section>
  )
}
export default BookList;
