import Link from 'next/link'
import React from 'react'
const SearchBar = () => {
  return (
    <div className='container flex justify-center items-center'>
    <div className="logoArea">
      <img src='../assets/brand/logo.png' alt='logo' className='w-[200px] h-[200px]' />
    </div>
    <div className="formItem flex flex-col justify-start gap-4 min-w-[15rem]">
      <input 
        type='text' 
        id="searchInput" 
        placeholder='Book Name, Author, Keyword...'
      />
    <button className='p-4 text-white bg-primaryDark relative'>
      <span className='absolute top-0 left-0 bg-primaryDark hover:-top-2 hover:-left-2'>Search</span>
    </button>
    </div>
  </div>
  )
}
export default SearchBar