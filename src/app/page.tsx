import React from 'react'
import Banner from './_components/banner/Banner'
import BookList from './_components/bookList/BookList'
import NavBar from './_components/navbar/NavBar'
import Footer from './_components/footer/Footer'
const page = () => {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <BookList/>
      <Footer/>
    </div>
  )
}
export default page