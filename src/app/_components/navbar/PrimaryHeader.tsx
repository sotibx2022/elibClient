const links = [
  { href: "/", text: "Home" },
  { href: "/categories", text: "Categories" },
  { href: "/best-sellers", text: "Best Sellers" },
  { href: "/new-arrivals", text: "New Arrivals" },
  { href: "/contact", text: "Contact Us" },
];
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
const PrimaryHeader = () => {
  return (
      <div className="wrapper bg-primaryDark">
        <nav className="container py-1 flex justify-between items-center">
        <div className="flex-between w-[60%]">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className='flex flex-col h-[1.5rem]'>
          <span className="text-white hover:text-primaryLight cursor-pointer">
            {link.text}
          </span>
          <span className="text-white hover:text-primaryLight cursor-pointer">
            {link.text}
          </span>
          </div>
        </Link>
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