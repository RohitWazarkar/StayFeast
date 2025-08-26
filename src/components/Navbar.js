"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Headphones } from "lucide-react";
import SessionTimer from "./SessionTimer";
import ChatbotModal from "../components/ChatbotWidget";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);   // mobile menu
  const [chatOpen, setChatOpen] = useState(false); // chatbot

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link href="/" className="hover:text-yellow-400 transition">
            Stay<span className="text-yellow-300">Feast</span>
          </Link>
        </h1>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium items-center">
          <Link href="/" className="hover:text-yellow-200">Home</Link>
          <Link href="/about" className="hover:text-yellow-200">About</Link>
          <Link href="/menu" className="hover:text-yellow-200">Food Menu</Link>
          <Link href="/contact" className="hover:text-yellow-200">Contact</Link>
          <Link href="/feedback" className="hover:text-yellow-200">Feedback</Link>
          <SessionTimer />

          {/* 🎧 Chat button */}
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            <Headphones size={20} />
            <span>Chat</span>
          </button>
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="hidden md:block ml-6 bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
        >
          Login
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg font-medium">
          <Link href="/" className="block hover:text-yellow-200">Home</Link>
          <Link href="/about" className="block hover:text-yellow-200">About</Link>
          <Link href="/menu" className="block hover:text-yellow-200">Food Menu</Link>
          <Link href="/contact" className="block hover:text-yellow-200">Contact</Link>
          <Link href="/feedback" className="block hover:text-yellow-200">Feedback</Link>
          <SessionTimer />

          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center justify-center gap-2 w-full bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            <Headphones size={20} />
            <span>Chat</span>
          </button>

          <Link
            href="/login"
            className="inline-block bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Login
          </Link>
        </div>
      )}

      {/* Chat modal (default closed) */}
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </nav>
  );
}
