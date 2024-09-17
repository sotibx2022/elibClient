import React from 'react'
import Link from 'next/link'
const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Header */}
        <div className="text-2xl font-bold">
          <Link href="/">
            elib
          </Link>
        </div>
        {/* Center: Menu items */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <span className="hover:text-gray-400 cursor-pointer">Home</span>
          </Link>
          <Link href="/categories">
            <span className="hover:text-gray-400 cursor-pointer">Categories</span>
          </Link>
          <Link href="/best-sellers">
            <span className="hover:text-gray-400 cursor-pointer">Best Sellers</span>
          </Link>
          <Link href="/new-arrivals">
            <span className="hover:text-gray-400 cursor-pointer">New Arrivals</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-gray-400 cursor-pointer">Contact Us</span>
          </Link>
        </div>
        {/* Right: Login and Signup buttons */}
        <div className="space-x-4">
          <Link href="/auth/login">
            <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">Login</span>
          </Link>
          <Link href="/auth/signup">
            <span className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer">Signup</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default NavBar
