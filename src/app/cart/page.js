"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, X } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("CartData", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + (item.mrp || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-blue-600">Your Cart</h1>
        <button
          onClick={() => (location.href = "./menu/")}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-red-600 transition"
        >
          🍽️ Go Food Menu
        </button>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-blue-100 text-blue-600">
            <tr>
              <th className="p-4">Dish</th>
              <th className="p-4">Name</th>
              <th className="p-4">Taste</th>
              <th className="p-4">Price</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Total</th>
              <th className="p-4 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-full object-cover shadow"
                  />
                </td>
                <td className="p-4 text-black font-semibold">{item.title}</td>
                <td className="p-4 text-black">{item.taste}</td>
                <td className="p-4 text-black">₹{item.mrp}</td>
                <td className="p-4 text-black">
                  <div className="flex items-center  text-black gap-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          const updated = cart.map((c) =>
                            c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c
                          );
                          setCart(updated);
                          localStorage.setItem("CartData", JSON.stringify(updated));
                        }
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity || 1}</span>
                    <button
                      onClick={() => {
                        const updated = cart.map((c) =>
                          c.id === item.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
                        );
                        setCart(updated);
                        localStorage.setItem("CartData", JSON.stringify(updated));
                      }}
                      className="w-7 h-7 flex items-center text-black justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4 font-semibold text-black">
                  ₹{(item.mrp || 0) * (item.quantity || 1)}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Total + Payment Button */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-blue-50 p-6 rounded-2xl shadow-lg gap-4">
        <span className="text-xl font-semibold text-gray-700">
          Total: <span className="text-2xl font-bold text-blue-600 text-black">₹{total}</span>
        </span>
        <button
          onClick={() => setShowPayment(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 transition text-lg font-semibold"
        >
          <CreditCard className="w-5 h-5" />
          Proceed to Payment
        </button>
      </div>

      {/* Payment Form Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
            >
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                Payment Gateway
              </h2>

              {/* Fake Payment Form (replace with Razorpay/Stripe later) */}
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-600 mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="***"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Card Holder</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  Pay ₹{total}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
