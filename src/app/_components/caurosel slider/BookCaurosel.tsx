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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
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
    const overlay = parent?.querySelector('.slideOverlay');
    if (overlay) {
      gsap.to(overlay, {
        top: "0%",
        duration: 1,
      });
    }
  };
  const hideBookDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest('.slideItem');
    const overlay = parent?.querySelector('.slideOverlay');
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
  className="container" >
      <div className="sectionHeading">
        <h2 className=" subHeading">Recent Uploads</h2>
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
              <button className="absolute bottom-0 left-1/2 text-2xl text-white bg-helper py-1 px-2" onClick={showBookDetails}> 
              <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <div className="slideOverlay absolute top-[100%] overflow-hidden left-0 flex flex-col pl-4 pt-8 justify-center items-start">
                <button className="absolute top-0 left-1/2 text-2xl text-white bg-helper py-1 px-2" onClick={hideBookDetails}>
                <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <h2 className="text-3xl text-white mb-2">{book.title}</h2>
                <p className="text-white">Genre : {book.genre}</p>
                <Link href={`/${book._id}`}>
                  <button className="link">
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
