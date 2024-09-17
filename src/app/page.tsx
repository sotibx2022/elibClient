import React from 'react'
import Banner from './_components/banner/Banner'
import BookList from './_components/bookList/BookList'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import BookCarousel from './_components/caurosel slider/BookCaurosel'
const page = () => {
  return (
    <>
        <Banner />
        <BookCarousel />
        <BookList />
    </>
  )
}
export default page
