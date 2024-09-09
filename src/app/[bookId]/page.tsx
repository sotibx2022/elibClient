import React from 'react';
import { Book } from '../_components/bookList';
import { getSingleBook } from '.';
import SingleBook from '../_components/singleBook/SingleBook';
interface PageProps {
    params:{
        bookId:string
    }
  bookId: string;
}
const Page:React.FC<PageProps> = async (props) => {
    const bookId = props.params.bookId;
  const singleBookDetails = await getSingleBook(bookId);
  const {
    title,
    author,
    description,
    coverImage,
    file,
    createdAt,
    updatedAt,
    user
  } = singleBookDetails.singleBook;
  const{name,email} = user;
  return (
    <div>
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>Description: {description}</p>
      <p>Published: {new Date(createdAt).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>
      <img src={coverImage} alt={`Cover of ${title}`} style={{ width: '200px', height: 'auto' }} />
      <p>File: <a href={file} download>Download Book</a></p>
      <p>Posted BY : {name}</p>
      <p>Posted BY : {email}</p>
    </div>
  );
};
export default Page;
