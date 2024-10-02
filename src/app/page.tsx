import React from 'react'
import BookList from './_components/bookList/BookList'
import NavBar from './_components/navbar/NavBar'
import Footer from './_components/footer/Footer'
import HeroLayout from './_components/heroLayout/HeroLayout'
const page = () => {
  return (
    <div>
      <HeroLayout/>
      <BookList/>
    </div>
  )
}
export default page