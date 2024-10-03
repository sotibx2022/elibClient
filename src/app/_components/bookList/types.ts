export interface RegisterData{
  firstName:string,
  lastName:string,
  email:string,
  password:string,
}
export interface LoginData{
  email:string,
  password:string
}
export interface BookCreate{
  title:string,
  description:string,
  author:string,
  genre:string,
  coverImage:FileList,
  file:FileList
  bookId:string,
}
export interface User{
  name:string,
  email:string,
  _id:string,
}
export interface BookDisplay{
  title?:string,
  description?:string,
  author:string,
  genre:string,
  coverImage:string,
  file?:string,
  user?:User,
  createdAt?:string,
  updatedAt?:string,
  _id:string,
  bookTitle?:string,
  bookDescription?:string,
}