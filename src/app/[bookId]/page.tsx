"use client"
import { getSingleBook } from '.';
import SingleBook from '../_components/singleBook/SingleBook';
import { useQuery } from '@tanstack/react-query';
interface PageProps {
    params:{
        bookId:string
    }
  bookId: string;
}
const Page:React.FC<PageProps> =  (props) => {
    const bookId = props.params.bookId;
    // const { data, isPending, error } = useQuery({queryKey:['product', bookId], queryFn:()=>getSingleBook(bookId)})
    // console.log(data)
  return (
    <>
    <h1>THis is for individual book page.</h1>
    </>
  //   <div>
  //   {data?.singleBook ? (
  //     <>
  //       <h2>{data.singleBook.title}</h2>
  //       <p>Author: {data.singleBook.author}</p>
  //       <p>Description: {data.singleBook.description}</p>
  //       <img 
  //         src={data.singleBook.coverImage} 
  //         alt={`Cover of ${data.singleBook.title}`} 
  //         style={{ width: '200px', height: 'auto' }} 
  //       />
  //       <p>
  //         File: <a href={data.singleBook.file} download>Download Book</a>
  //       </p>
  //     </>
  //   ) : (
  //     <p>No book data available.</p>
  //   )}
  // </div>
  );
};
export default Page;
