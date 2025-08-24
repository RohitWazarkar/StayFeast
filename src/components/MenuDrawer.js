"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MenuDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sliding Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 p-6">
          <button className="text-left text-lg font-medium text-gray-800 hover:text-blue-600">🍽️ Food</button>
          <button className="text-left text-lg font-medium text-gray-800 hover:text-blue-600">🏨 Hotels</button>
          <button className="text-left text-lg font-medium text-gray-800 hover:text-blue-600">🚗 Rented Vehicles</button>
          <button className="text-left text-lg font-medium text-gray-800 hover:text-blue-600">➕ More</button>
        </div>
      </motion.div>
    </>
  );
}
