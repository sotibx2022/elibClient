"use client"
import SingleBook from '../_components/singleBook/SingleBook';
import { useQuery } from '@tanstack/react-query';
import { getAllHTMLBooks } from '@/helper/queryfns';
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
  const { data: HTMLNotes = [], isLoading, error } = useQuery({
    queryKey: ['HTMLNotes'],
    queryFn: getAllHTMLBooks
  });
  const processedNote = (note: Note): Note => {
    const splittedTitle = note.title.split(" by "); // Use " by " to ensure correct splitting
    const updatedNote: Note = {
        ...note,
        author: (splittedTitle[1] || 'Unknown Author').trim(), // Handle case when there's no author
        genre: "HTML",
    };
    return updatedNote;
};
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
       {HTMLNotes.map((note: Note) => {
                const updatedNote:Note = processedNote(note); // Process the note
                return (
                    <SingleBook key={updatedNote._id} {...updatedNote} /> // Pass the processed note as a prop
                );
            })}
    </div>
  );
};
export default Page;
