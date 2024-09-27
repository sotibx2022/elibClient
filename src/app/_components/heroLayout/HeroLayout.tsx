"use client"
import React, { useEffect, useState } from 'react';
import Banner from '../banner/Banner';
import BookCaurosel from '../caurosel slider/BookCaurosel';
const HeroLayout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Update the width on resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
      <div>
        <Banner />
        <BookCaurosel />
      </div>
  );
};
export default HeroLayout;
