"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Lock, Phone, Shield, Eye, EyeOff, Send, CheckCircle
} from "lucide-react";

const ROLES = ["Guest", "Owner", "Admin", "Staff"];

export default function RegisterPage() {
  const [mode] = useState("online"); // keep hook if you later add online/offline toggle
  const [showPwd, setShowPwd] = useState(false);
  const [step, setStep] = useState("form"); // form | otp | success

  // form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [role, setRole] = useState("Guest");
  const [phone, setPhone] = useState("");

  // password strength (simple)
  const [strength, setStrength] = useState(0);

  // OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    const s = calcStrength(passwordHash);
    setStrength(s);
  }, [passwordHash]);

  // simple strength calculator
  function calcStrength(p) {
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0-5
  }

  const strengthLabel = ["Very Weak", "Weak", "Okay", "Good", "Strong", "Excellent"][strength];

  // --- Submit REG form -> go to OTP step ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // generate 6-digit OTP and “send”
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep("otp");
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => inputsRef.current?.[0]?.focus(), 50);

    // Mock “send” (replace with real SMS/Email service later)
    console.log("OTP (dev):", code);
    setResendIn(30);
  };

  // resend countdown
  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const id = setInterval(() => setResendIn((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step, resendIn]);

  const resendOtp = () => {
    if (resendIn > 0) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    console.log("Resent OTP (dev):", code);
    setResendIn(30);
    setOtp(["", "", "", "", "", ""]);
    inputsRef.current?.[0]?.focus();
  };

  // OTP input handling
  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return; // only one digit
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  // Verify OTP and “register”
  const handleVerifyOtp = async () => {
    const entered = otp.join("");
     if (otp === "999999") {
    alert("✅ OTP Verified Successfully!");
  } else {
    alert("❌ Invalid OTP. Please try again.");
  }

    // Build payload (createdAt now)
    const payload = {
      name,
      email,
      passwordHash,     // NOTE: currently plain to match your existing login logic
      role,
      phone,
      createdAt: new Date().toISOString(),
    };

    try {
      // ONLINE: call your real API (adjust to your DB)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || "Registration failed");
        return;
      }

      setStep("success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // UI
  return (
    <div className="relative min-h-screen flex">
      {/* Blurry background image (fill your own) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-center bg-cover filter blur-sm scale-105"
          style={{ backgroundImage: "url('.\\images\\homeimages\\HotelHD.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/40" />
      </div>

      {/* Left Hero (optional image/text) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white max-w-lg"
        >
          <h1 className="text-5xl font-extrabold drop-shadow mb-4">
            Join <span className="text-yellow-300">StayFeast</span>
          </h1>
          <p className="text-lg text-blue-100">
            One account for Hotels, Food and Rentals. Book faster, track orders, and unlock member-only deals.
          </p>
        </motion.div>
      </div>

      {/* Right Card */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-8 border border-white/40"
        >
          {step === "form" && (
            <>
              <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                Create your account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <User size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <Mail size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <Phone size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                    placeholder="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>

                {/* Role */}
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <Shield size={18} />
                  </div>
                  <select
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-500">
                    <Lock size={18} />
                  </div>
                  <input
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                    placeholder="Password"
                    type={showPwd ? "text" : "password"}
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-3 text-blue-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Strength meter */}
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full transition-all`}
                      style={{
                        width: `${(strength / 5) * 100}%`,
                        background:
                          strength < 2
                            ? "#ef4444"
                            : strength < 3
                            ? "#f59e0b"
                            : strength < 4
                            ? "#10b981"
                            : "#22c55e",
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">Password strength: {strengthLabel}</p>
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg"
                  type="submit"
                >
                  <Send size={18} />
                  Send OTP
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Verify OTP</h2>
              <p className="text-center text-gray-600 mb-6">
                We’ve sent a 6-digit code to <span className="font-semibold">{email}</span>.
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setStep("form")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Change details
                </button>

                <button
                  onClick={resendOtp}
                  disabled={resendIn > 0}
                  className={`text-sm ${resendIn > 0 ? "text-gray-400" : "text-blue-600 hover:underline"}`}
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleVerifyOtp}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 rounded-xl font-semibold shadow-lg"
              >
                Verify & Create Account
              </motion.button>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-500" size={56} />
              <h3 className="text-2xl font-bold text-blue-700 mt-4">Account Created</h3>
              <p className="text-gray-600 mt-2">
                Your StayFeast account is ready. You can now log in and start exploring!
              </p>

              <a
                href="/login"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                Go to Login
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
