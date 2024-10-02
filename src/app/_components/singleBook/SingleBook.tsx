import React from 'react'
import Link from 'next/link'
import { BookDisplay } from '../bookList/types'
import LinkComponent from '../link/LinkComponent'
import SecondaryButton from '../secondaryButton/SecondaryButton'
const SingleBook: React.FC<BookDisplay> = ({ title, user, genre, description,author, coverImage,_id }) => {
  return (
    <div className="border shadow-primaryLight mb-4 flex flex-col items-start w-[300px] p-2">
      <img src={coverImage} alt={title} className="aspect-[3/2] object-cover rounded-lg mb-4" />
      <h2 className="secondayHeading">{title}</h2>
      <p className="primaryParagraph">Genre : {genre}</p>
      <p className='primaryParagraph'>Author : {author}</p>
      <Link href={`/${_id}`}> 
      <SecondaryButton text='More ...' />
      </Link>
    </div>
  )
}
export default SingleBook
