export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Book {
    _id: string;
    title: string;
    user: User;
    genre: string;
    description: string;
    coverImage: string;
    file: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }