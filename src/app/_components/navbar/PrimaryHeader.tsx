"use client"
const links = [
  { href: "/", text: "Home" },
  { href: "/categories", text: "Categories" },
  { href: "/best-sellers", text: "Best Sellers" },
  { href: "/new-arrivals", text: "New Arrivals" },
  { href: "/contact", text: "Contact Us" },
];
import Link from 'next/link'
import React from 'react';
import LinkComponent from '../link/LinkComponent';
const PrimaryHeader =() =>{
  return (
      <div className="wrapper bg-primaryDark">
        <nav className="container py-1 flex justify-between items-center">
        <div className="flex-between w-[60%]">
      {links.map((link, index) => (
        <li className='text-white list-none' key={index} >
          <LinkComponent   href={link.href} text={link.text}/>
        </li>
      ))}
    </div>
        <div className="flex justify-end w-[20%]">
  <Link href="/auth/login">
    <span className="bg-helper py-1 px-2 border-r-2 border-white text-white transition-colors duration-500 hover:bg-white hover:text-primaryDark">
      Login
    </span>
  </Link>
  <Link href="/auth/signup">
    <span className="bg-helper py-1 px-2 text-white transition-colors duration-500 hover:bg-white hover:text-primaryDark">
      Signup
    </span>
  </Link>
</div>
      </nav>
      </div>
  )
}
export default PrimaryHeader