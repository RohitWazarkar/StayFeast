"use client";
import { useState } from "react";
import { FaCalendarAlt, FaUser, FaBed } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookStay() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${formData.name}!`);
    // Here you can call API or save data
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left Image */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-2xl shadow-lg overflow-hidden"
      >
        <img
          src=".\images\homeimages\r1.webp"
          alt="Hotel Room"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FaBed /> Book Your Stay
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border  text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@stayfeast.com"
              className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            >
              <option value="">Select Room</option>
              <option value="Deluxe">Deluxe Room</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential Suite</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-In
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-Out
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-yellow-300 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-400 transition transform hover:scale-105 duration-200 mt-4">
            <FaCalendarAlt /> Confirm Booking
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Or <Link href="/menu" className="text-blue-600 font-semibold hover:underline">explore our menu</Link>
        </p>
      </motion.div>
    </div>
  );
}
