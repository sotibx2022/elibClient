"use client"
import { getAllNextjsBooks } from '@/helper/queryfns';
import SingleBook from '../_components/singleBook/SingleBook';
import { useQuery } from '@tanstack/react-query';
interface Note{
    _id:string,
    coverImage:string,
    url:string,
    title:string,
    description:string,
    author:string,
    genre:string,
}
const Page = () => {
  // Destructure data, isLoading, and error states from useQuery
  const { data: nextjsNotes = [], isLoading, error } = useQuery({
    queryKey: ['nextjsNotes'],
    queryFn: getAllNextjsBooks
  });
  // If the data is still loading, show a loading message or spinner
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner or custom component
  }
  // If there's an error, show an error message
  if (error) {
    return <div>Error fetching data</div>; // Handle errors gracefully
  }
  return (
    <div className='container flex justify-between flex-wrap'>
       {nextjsNotes.map((note: Note) => {
                return (
                    <SingleBook key={note._id} {...note} /> // Pass the processed note as a prop
                );
            })}
    </div>
  );
};
export default Page;
