"use client"
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/helper/queryfns";
import { BookDisplay } from "../bookList/types";
import Link from "next/link";
import gsap from 'gsap';
import { Swiper as SwiperType } from "swiper/types";
const BookCarousel = () => {
  const { data: books = [] } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks
  });
  const [slidesPerView, setSlidesPerView] = useState(1);
  // Functions to find the total width and calculate slides per view
  const findTotalWidth = () => {
    return window.innerWidth;
  };
  const calculateSlidesPerView = () => {
    const totalWidth = findTotalWidth();
    const availableSpace = Math.floor(totalWidth / 250);
    return availableSpace > 0 ? availableSpace : 1;
  };
  useEffect(() => {
    setSlidesPerView(calculateSlidesPerView());
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const showBookDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest('.slideItem');
    const overlay = parent?.querySelector('.swiperItemOverlay');
    if (overlay) {
      gsap.to(overlay, {
        top: "0%",
        duration: 1,
      });
    }
  };
  const hideBookDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest('.slideItem');
    const overlay = parent?.querySelector('.swiperItemOverlay');
    if (overlay) {
      gsap.to(overlay, {
        top: "100%",
        duration: 1,
      });
    }
  };
  const totalWidth = findTotalWidth()
  return (
<section
  className={`w-[80vw] h-[200px] ${totalWidth > 1000 ? 'absolute z-10 top-[60vh] left-[50%] transform -translate-x-[50%]' : ''}`}>
      <div className="sectionHeading">
        <h2 className="text-5xl py-2">Recent Uploads</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} 
        slidesPerView={slidesPerView} 
        spaceBetween={50}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="h-[200px] w-full swiperWrapper"
      >
        {books.map((book: BookDisplay) => (
          <SwiperSlide className="w-[250px] slideItem relative h-full" key={book._id}>
              <img src={book.coverImage} alt={book.title} className="object-cover rounded-lg mb-4 w-full h-full" />
              <button className="absolute bottom-0 left-1/2 text-5xl text-red-500" onClick={showBookDetails}>^</button>
              <div className="swiperItemOverlay absolute top-[100%] overflow-hidden left-0 w-full h-full bg-gradient-to-t from-[rgba(148,163,184,0)] via-[rgba(139,92,246,0.75)] to-[rgba(100,116,139,0.90)]">
                <button className="absolute bottom-0 left-1/2 text-5xl text-white" onClick={hideBookDetails}>^</button>
                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-2">by {book.user.name}</p>
                <p className="text-gray-500 mb-4">{book.genre}</p>
                <Link href={`/${book._id}`}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                  </button>
                </Link>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default BookCarousel;
