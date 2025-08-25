"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock JSON users for offline login
const users = [
  {
    id: 1,
    name: "Rohit Wazarkar",
    email: "rohit@gmail.com",
    passwordHash: "Rohit@123", // NOTE: plain for demo
    role: "Guest",
    phone: "9876543210",
    createdAt: "2025-08-23 22:36:26.760",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    passwordHash: "hashed_pass_2",
    role: "Owner",
    phone: "9876501234",
    createdAt: "2025-08-23 22:36:26.760",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    passwordHash: "hashed_pass_3",
    role: "Admin",
    phone: "9999999999",
    createdAt: "2025-08-23 22:36:26.760",
  },
  {
    id: 4,
    name: "Ravi Patel",
    email: "ravi@example.com",
    passwordHash: "hashed_pass_4",
    role: "Staff",
    phone: "9898989898",
    createdAt: "2025-08-23 22:36:26.760",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [mode, setMode] = useState("online"); // NEW: online/offline

  // Generate random captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit
    setCaptcha(random.toString());
    setCaptchaInput("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (captcha !== captchaInput) {
      alert("Captcha does not match!");
      generateCaptcha();
      return;
    }

    if (mode === "offline") {
      // OFFLINE MODE LOGIN
      const foundUser = users.find(
        (u) => u.email === email && u.passwordHash === password
      );

      if (!foundUser) {
        alert("Invalid email or password (Offline Mode)");
        return;
      }

      // Save locally
      localStorage.setItem("user", JSON.stringify(foundUser));
      alert(`Welcome ${foundUser.name}! (Offline Mode)`);
      window.location.href = "/";
    } else {
      // ONLINE MODE LOGIN (existing functionality unchanged)
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Login failed");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful! (Online Mode)");
        window.location.href = "/";
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Section with Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-grey-600 to-purple-600">
        <img
          src=".\images\homeimages\image.png"
          alt="Login Illustration"
          className="rounded-lg shadow-lg max-h-[80%]"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <motion.h1
            className="text-3xl font-bold text-center text-blue-600 mb-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome Back{" "}
            <motion.span
              initial={{ rotate: 0, scale: 1, y: 0 }}
              animate={{
                rotate: [0, 20, -15, 20, 0],
                scale: [1, 1.1, 1, 1.05, 1],
                y: [0, -3, 0, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
            >
              👋
            </motion.span>
          </motion.h1>

          {/* NEW: Radio Buttons for Online / Offline */}
          <div className="flex justify-center gap-6 mb-6">
            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                name="mode"
                value="online"
                checked={mode === "online"}
                onChange={() => setMode("online")}
              />
              Online
            </label>
            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                name="mode"
                value="offline"
                checked={mode === "offline"}
                onChange={() => setMode("offline")}
              />
              Offline
            </label>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className="w-full border text-black border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                type="email"
                placeholder="example@stayfeast.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                className="w-full text-black border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Captcha */}
            <div className="flex items-center justify-between gap-3">
              <div className="bg-gray-100 px-5 py-3 rounded-lg text-lg font-mono tracking-widest text-gray-800 shadow-inner">
                {captcha}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Refresh
              </button>
            </div>

            <input
              className="w-full border text-black border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              type="text"
              placeholder="Enter captcha above"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
            />

            {/* Login Button */}
            <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
              Login
            </button>

            {/* Extra Links */}
            <div className="flex justify-between text-sm mt-2">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
