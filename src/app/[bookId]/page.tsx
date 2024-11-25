"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../_components/loading/Loading';
import Link from 'next/link';
import SecondaryButton from '../_components/secondaryButton/SecondaryButton';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../_components/navbar/NavBar';
import Footer from '../_components/footer/Footer';
interface PageProps {
  params: {
    bookId: string;
  };
}
const getSingleBook = async (bookId: string) => {
  const response = await axios.get(`http://localhost:3000/api/${bookId}`);
  return response.data.singleBook;
};
const Page: React.FC<PageProps> = (props) => {
  const { bookId } = props.params;
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', bookId],
    queryFn: () => getSingleBook(bookId),
  });
  console.log(data);
  if (isLoading) return <Loading/>
  if (error) return <div>Error loading book</div>;
  return (
    <>
    <NavBar/>
<div className='container flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]'>
  <div className="singleBookLeft w-1/2">
  <h1 className='primaryHeading mb-1'>{data?.title}</h1>
      <h2 className='primaryParagraph'>Author : {data.author}</h2>
      <h2 className='primaryParagraph mb-1'>Genre : {data.genre}</h2>
      <Link href={data.url?data.url:data.file || 'http://localhost:3000'} className='flex'>
      <SecondaryButton text="Downlode" icon="faDownload"/>
      </Link>
  </div>
  <div className="singleBookRight w-1/2">
  <p className='primaryParagraph'>{data.description}</p>
  </div>
    </div>
    <Footer/>
    </>
  );
};
export default Page;
