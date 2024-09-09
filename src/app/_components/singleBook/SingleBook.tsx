import React from 'react'
import { Book } from '../bookList'
import Link from 'next/link'
const SingleBook: React.FC<Book> = ({ title, user, genre, description, coverImage,_id }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md mb-4 flex flex-col items-center w-[300px]">
      <img src={coverImage} alt={title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">by {user.name}</p>
      <p className="text-gray-500 mb-4">{genre}</p>
      <Link href={`/${_id}`}>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
  Read More
</button>
</Link>
    </div>
  )
}
export default SingleBook
