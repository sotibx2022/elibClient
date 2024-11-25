"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookDisplay } from "../types/types";
import SingleBook from "../_components/singleBook/SingleBook";
import { gradientGenerator } from "@/helper/gradinetGenerator";
import Loading from "../_components/loading/Loading";
import NavBar from "../_components/navbar/NavBar";
import Footer from "../_components/footer/Footer";
const Page = () => {
    const searchValue = (typeof window !== "undefined" && window.location.href.split("=")[1]) || '';
    const findFilteredBook = async (searchValue: string) => {
        const result = await axios.get(`http://localhost:3000/api/search?searchValue=${searchValue}`);
        return result.data.filteredBooks;
    };
    const { data: filteredBooks = [], isLoading, error } = useQuery({
        queryKey: ['filteredBook', searchValue], // Include searchValue in queryKey
        queryFn: () => findFilteredBook(searchValue), // Call the function with searchValue
    });
    if(isLoading){
        return <Loading/>
    }
    return (
        <>
        <NavBar/>
            <div className="container flex flex-wrap">
            {filteredBooks && filteredBooks.length > 0 && filteredBooks.map((book: BookDisplay) => {
    const background = gradientGenerator();
    return (
        <SingleBook
            {...book} background={background}
        />
    );
})}
            </div>
            <Footer/>
            </>
    );
}
export default Page;
