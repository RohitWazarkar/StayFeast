import Link from "next/link";
import SessionTimer from "./SessionTimer";


export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
      

        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link href="./" className="hover:text-yellow-400 transition">
            Stay<span className="text-yellow-300">Feast</span>
          </Link>
        </h1>


        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-200 transition duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-200 transition duration-200">
            About
          </Link>
          <Link href="/menu" className="hover:text-yellow-200 transition duration-200">
            Food Menu
          </Link>
          <Link href="/contact" className="hover:text-yellow-200 transition duration-200">
            Contact
          </Link>
          <>
            <nav className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white shadow">
      <SessionTimer />
    </nav>
          </>
        </div>


        {/* Login Button */}
        <Link
          href="/login"
          className="ml-6 bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
