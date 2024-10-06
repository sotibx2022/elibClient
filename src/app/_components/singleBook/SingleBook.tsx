"use client";
import React from 'react';
import Link from 'next/link';
import { BookDisplay } from '../bookList/types';
import SecondaryButton from '../secondaryButton/SecondaryButton';
const SingleBook: React.FC<BookDisplay> = ({ title, genre, author, coverImage, _id, background }) => {
    console.log(background);
    return (
        <div className="border shadow-primaryLight mb-4 flex flex-col items-start w-[300px] h-[300px] p-2">
            <div className="imageArea relative w-full h-full">
                <img src={coverImage} alt={title} className="w-full h-full absolute top-0 left-0" />
                <div 
                    className="overLay absolute top-0 left-0 w-full h-full" 
                    style={{ 
                        background: background ? background : ""
                    }}
                ></div>
                 {background && (
                  <>
                    <h2 className="absolute w-[80%] h-[50%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 backdrop-blur-md border border-white flex items-center justify-center px-2">
                        <span className='secondaryHeading z-10 opacity-100'>{title}</span>
                    </h2>
                    <p className="primaryParagraph">Genre: {genre}</p>
                    <p className="primaryParagraph">Author: {author}</p>
                    </>
                )}
            </div>
            <div className="contentArea flex justify-between w-full items-center mt-2">
                <div className="bookDetails">
                    {!background && (
                        <h2 className="secondaryHeading">{title}</h2> // Added title here
                    )}
                    <p className="primaryParagraph">Genre: {genre}</p>
                    <p className="primaryParagraph">Author: {author}</p>
                </div>
                <Link href={`/${_id}`} className='max-h-[2rem]'>
                    <SecondaryButton text='More ...' />
                </Link>
            </div>
        </div>
    );
};
export default SingleBook;
