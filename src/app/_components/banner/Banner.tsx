"use client"
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import slider1 from "../../../../public/assets/slider/slider1.jpg"
import slider2 from "../../../../public/assets/slider/slider2.jpg"
import slider3 from "../../../../public/assets/slider/slider3.jpg"
import Image from "next/image";
import gsap from 'gsap'
const Banner = () => {
  const handleSlideChange = () => {
    // Animate title1 and title2 on slide change
    gsap.to(`.title1`, {
      y: '-3rem',
      duration: 1,
    });
    gsap.to(`.title2`, {
      y: '-3rem',
      duration: 1,
    });
  };
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay ]} // Load Swiper modules
    spaceBetween={50}
    slidesPerView={1}
    navigation // Enable navigation for the arrows to work
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={handleSlideChange}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    className="h-auto max-h-[90vh] w-full"
  >
  <SwiperSlide>
  <div className="slideImage relative">
    <Image src={slider1} alt="slider1" className="object-cover" />
    <div className="slideOverlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(148,163,184,0)] via-[rgba(139,92,246,0.75)] to-[rgba(100,116,139,0.90)]">
      <div className="absolute top-0 left-0 w-full p-4 text-white">
        <div className="sliderTitle bg-red-500  w-full h-[3rem] overflow-hidden">
          <h2 className="text-5xl z-10 uppercase title1">Where Books Come to Life</h2>
          <h2 className="text-5xl z-10 uppercase title2">Where Books Come to Life</h2>
        </div>
        <p className="text-xl">Create, Publish, and Dive into a World of Free Literature.</p>
      </div>
    </div>
  </div>
</SwiperSlide>
<SwiperSlide>
  <div className="slideImage relative">
    <Image src={slider2} alt="slider2" className="object-cover" />
    <div className="slideOverlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(148,163,184,0)] via-[rgba(139,92,246,0.75)] to-[rgba(100,116,139,0.90)]">
      <div className="absolute top-0 left-0 w-full p-4 text-white">
        <div className="sliderTitle bg-red-500 overflow-hidden">
          <h2 className="text-5xl z-10 uppercase w-full h-[4rem] overflow-hidden">Your Digital Library</h2>
          <h2 className="text-5xl z-10 uppercase">Your Digital Library</h2>
        </div>
        <p className="text-xl">Share, Discover, and Enjoy Thousands of Books from Authors Worldwide.</p>
      </div>
    </div>
  </div>
</SwiperSlide>
<SwiperSlide>
  <div className="slideImage relative">
    <Image src={slider3} alt="slider3" className="object-cover" />
    <div className="slideOverlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(148,163,184,0)] via-[rgba(139,92,246,0.75)] to-[rgba(100,116,139,0.90)]">
      <div className="absolute top-0 left-0 w-full p-4 text-white">
        <div className="sliderTitle bg-red-500 overflow-hidden">
          <h2 className="text-5xl z-10 uppercase w-full h-[4rem] overflow-hidden">Read, Share, Connect</h2>
          <h2 className="text-5xl z-10 uppercase">Read, Share, Connect</h2>
        </div>
        <p className="text-xl">A Community for Book Lovers to Explore and Publish Stories.</p>
      </div>
    </div>
  </div>
</SwiperSlide>
    {/* Add as many slides as needed */}
  </Swiper>
  );
};
export default Banner;
