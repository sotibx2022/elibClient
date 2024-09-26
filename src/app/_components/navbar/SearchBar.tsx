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
      <button type="submit" className="primaryButton">Search</button>
    </div>
  </div>
  )
}
export default SearchBar