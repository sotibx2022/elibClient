import React from 'react'
import Link from 'next/link'
import { BookDisplay } from '../bookList/types'
const SingleBook: React.FC<BookDisplay> = ({ title, user, genre, description,author, coverImage,_id }) => {
  return (
    <div className="border shadow-primaryLight mb-4 flex flex-col items-start w-[300px]">
      <img src={coverImage} alt={title} className="w-full object-cover rounded-lg mb-4" />
      <h2 className="secondayHeading pl-1">{title}</h2>
      <p className="primaryParagraph pl-1">Genre : {genre}</p>
      <p className='primaryParagraph pl-1'>Author : {author}</p>
      <Link href={`/${_id}`} className='link pl-1'>
  Read More
</Link>
    </div>
  )
}
export default SingleBook
