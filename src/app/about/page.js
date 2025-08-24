"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            About StayFeast
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Welcome to StayFeast – where comfort meets cuisine. Our hotel and
            restaurant offer the best experience for our guests with a focus
            on hospitality, quality, and memorable moments.
          </p>
        </div>

        <motion.img
          src=".\images\homeimages\h3.jpg" // placeholder image, replace later
          alt="Hotel About"
          className="w-full md:w-1/2 rounded-3xl shadow-xl mt-6 md:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>

      {/* Our Mission / Vision Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div
          className="bg-blue-50 p-8 rounded-3xl shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To provide guests with a premium experience combining comfort,
            delicious food, and top-notch hospitality. We aim to make every
            stay unforgettable.
          </p>
        </motion.div>

        <motion.div
          className="bg-yellow-50 p-8 rounded-3xl shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
          <p className="text-gray-700">
            To become the most loved hotel and restaurant, offering both luxury
            and warmth. Our vision is to make StayFeast synonymous with
            comfort, cuisine, and care.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <motion.div
              key={member}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                  src=".\images\homeimages\ch1.webp"
                alt={`Team Member ${member}`}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-blue-600 mb-1">
                John Doe
              </h3>
              <p className="text-gray-500">Chef</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-blue-50 rounded-3xl shadow-lg p-12 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Why Choose StayFeast?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          We combine modern amenities, exquisite food, and a warm, friendly
          environment. Every detail is curated to make our guests feel at home.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
        >
          Explore Our Rooms
        </motion.button>
      </div>
    </div>
  );
}
