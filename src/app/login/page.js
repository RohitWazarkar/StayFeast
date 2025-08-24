"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

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

    // Save JWT token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");
    window.location.href = "/"; // redirect after login
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};



  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (captcha !== captchaInput) {
  //     alert("Captcha does not match!");
  //     generateCaptcha();
  //     return;
  //   }

  //   const res = await fetch("/api/auth", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const data = await res.json();
  //   alert(data.message);
  // };

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
         <>
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
         </>

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
    <a href="/register" className="text-blue-600 font-semibold hover:underline">
      Create an account
    </a>
  </div>
</form>


          <p className="text-center text-black-500 text-red mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 font-semibold">
              Register
            </a>
          </p>
        </div>
     
   
      </div>
    </main>
  );
}
