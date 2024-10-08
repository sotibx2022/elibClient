"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component for description
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useForm } from "react-hook-form";
import { BookCreate } from "@/app/types/types";
import { validateBookTitle, validateDescription, validateFile, validateFullName } from '../../../helper/validateBook';
import { validateFirstName } from "@/helper/validation";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { createBook} from "@/helper/bookMutation"; // Assuming you have updateBook mutation too
import { useEffect, useState } from "react";
import { getSingleBook } from "@/helper/queryfns";
import LoadingButton from "@/app/customUI/LoadingButton";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TextEditor from "@/app/_components/textEditor/TextEditor";
const page = () => {
  const[showTextEditor, setShowTextEditor] = useState(false);
  const[file,setFile] = useState<File |null>(null)
  const { bookId } = useParams();
  const router = useRouter();
  const { register,setValue, formState: { errors }, handleSubmit } = useForm<BookCreate>();
  // Create mutation
  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      alert(data.message);
      router.push('/dashboard/books');
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert("There was an error while creating or updating the book.");
      } else {
        alert("An unexpected error Occur.");
      }
    }
  });
  // Form submission handler
  const onSubmit = (data: BookCreate) => {
    mutation.mutate(data);
  };
  const openTextEditor =() =>{
    setShowTextEditor(true)
  }
  const receivedDisplayValue =(value:boolean) =>{
    setShowTextEditor(value);
  }
  const receivedFileFromEditor = (file: File) => {
    setFile(file);
    // Convert the file into a FileList using DataTransfer
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    console.log(file);
    // Set the value of the file input as a FileList
    setValue('file', dataTransfer.files);
  };
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{bookId ? "Edit the Book" : "Add the Book"}</CardTitle>
          <CardDescription>
            {bookId ? "Edit the details of the book." : "You can add a new book related to web development technologies."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-4">
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" placeholder="Enter book title" {...register("title", validateBookTitle())} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            {/* Author */}
            <div className="mb-4">
              <Label htmlFor="author">Author</Label>
              <Input id="author" type="text" placeholder="Author Name" {...register("author", validateFullName())} />
              {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
            </div>
            {/* Genre */}
            <div className="mb-4">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" type="text" placeholder="Genre (e.g., Web Development)" {...register("genre", validateFirstName())} />
              {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
            </div>
            {/* Description */}
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the book"
                rows={4}
                {...register("description", validateDescription())}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            {/* Cover Image */}
            <div className="mb-4">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input id="coverImage" type="file" {...register("coverImage", validateFile())} />
              {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
            </div>
            {/* PDF File */}
            {file ? (
        <div className="file-info">
          <p>Selected File: {file.name}</p>
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor="file">Upload PDF</label>
          <input
            id="file"
            type="file"
            {...register('file', { required: 'A file is required' })}
            // Optional: Add an onChange to capture file selection if needed
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                receivedFileFromEditor(selectedFile);
              }
            }}
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
        </div>
      )}
            or
            <span onClick={openTextEditor}>Create Book PDF</span>
            {showTextEditor && <TextEditor displayValue={receivedDisplayValue} onPublish={receivedFileFromEditor}/>}
            {/* Submit Button */}
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <LoadingButton /> : bookId ? "Update" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default page;