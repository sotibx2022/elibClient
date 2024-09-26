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
const slidesData = [
  {
    image: slider1,
    title: "Where Books Come to Life",
    description: "Create, Publish, and Dive into a World of Free Literature.",
  },
  {
    image: slider2,
    title: "Your Digital Library",
    description: "Share, Discover, and Enjoy Thousands of Books from Authors Worldwide.",
  },
  {
    image: slider3,
    title: "Read Share & Connect",
    description: "A Community for Book Lovers to Explore and Publish Stories.",
  },
];
const Banner = () => {
  const findTitleHeight =()=>{
    const sliderTitle = document.querySelectorAll('.sliderTitle')[0] as HTMLElement;
    return sliderTitle.offsetHeight;
  }
  useEffect(()=>{
    window.addEventListener('resize',findTitleHeight);
    return(()=>{
      window.removeEventListener('resize',findTitleHeight);
    })
  },[])
  const resetTitlePosition = () => {
    const height = findTitleHeight();
    gsap.set(".title1", { y: 0 });
    gsap.set(".title2", { y: `${height}px` });
    gsap.set('.subTitle',{x:'100%'})
  };
  const handleSlideChange = () => {
    const height = findTitleHeight();
    gsap.to(`.title1`, {
      y: `-${height}px`,
      duration: 1,
    });
    gsap.to(`.title2`, {
      y: `-${height}px`,
      duration: 1,
    });
    gsap.to('.subTitle',{
      x:0,
      duration:1,
    })
    resetTitlePosition()
  };
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} // Load Swiper modules
    spaceBetween={50}
    slidesPerView={1}
    navigation // Enable navigation for the arrows to work
    scrollbar={{ draggable: true }}
    onSlideChange={handleSlideChange}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    className="h-auto max-h-[100vh] w-full"
  >
    {slidesData.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="slideImage relative">
          <Image src={slide.image} alt={`slider${index + 1}`} className="object-cover" />
          <div className="slideOverlay absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(148,163,184,0)] via-[rgba(139,92,246,0.75)] to-[rgba(100,116,139,0.90)]">
            <div className="absolute top-0 left-0 w-full p-4 text-white">
              <div className="sliderTitle w-full  md:h-[3rem] h-[2rem] overflow-hidden">
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title1">{slide.title}</h2>
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title2">{slide.title}</h2>
              </div>
              <p className="text-xl subTitle translate-x-[100%]">{slide.description}</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  );
};
export default Banner;
