"use client";
import {  useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch("/mock/menu.json");
      const data = await res.json();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

 const addToCart = (item) => {
  try {
    // Get the cart from localStorage (if available)
    const storedCart = localStorage.getItem("cart");
    let cart = [];

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart); // Parse only if valid
        if (!Array.isArray(cart)) {
          cart = []; // Reset if corrupted
        }
      } catch (err) {
        console.error("Invalid JSON in cart, resetting...", err);
        cart = [];
      }
    }

    // Add new item
    cart.push(item);

    // Save back
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
  } catch (err) {
    console.error("Error in addToCart:", err);
  }
};


    const router = useRouter();



  
  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="flex justify-between items-center mb-10">
  <h1 className="text-4xl font-bold text-blue-600">
    Our Delicious Menu
  </h1>

  <button
    onClick={handleCartClick}
    className="relative bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition"
  >
    <FaShoppingCart className="w-5 h-5 text-white" />
    {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cart.length}
      </span>
    )}
  </button>
</div>


      <div className="grid md:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            {/* Food Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-1">
              {/* Title + Taste */}
              <h2 className="text-xl font-bold text-blue-600">{item.title}</h2>
              <p className="text-gray-500 mb-2">Taste: {item.taste}</p>

              {/* MRP + Estimated Time */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">₹{item.mrp}</span>
                <span className="text-sm text-gray-500">{item.estimatedTime}</span>
              </div>

              {/* Availability */}
              <p
                className={`mb-4 font-medium ${
                  item.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.available ? "Available" : "Not Available"}
              </p>

              {/* Add to Cart Button */}
             <button
  disabled={!item.available}
  onClick={() => addToCart(item)}
  className={`mt-auto flex justify-center items-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition transform duration-200 ${
    item.available
      ? "bg-yellow-400 hover:bg-yellow-500"
      : "bg-gray-300 cursor-not-allowed"
  }`}
>
  Add to Cart
</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-12 bg-blue-50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Cart Items</h2>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.title}</span>
                <span>₹{item.mrp}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-gray-700">
            Total: ₹{cart.reduce((sum, i) => sum + i.mrp, 0)}
          </p>
        </div>
      )}
    </div>
  );
}
