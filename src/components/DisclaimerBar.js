// src/components/DisclaimerBar.js
"use client";

export default function DisclaimerBar() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm py-2 text-center">
      <div className="whitespace-nowrap overflow-hidden">
        <div className="inline-block animate-marquee px-4">
          🚨 This site is built for <span className="font-semibold">educational purposes</span>. 
          Backend is <span className="font-semibold">not connected</span>. 
          Please fill feedback — some bugs may occur 🚧
        </div>
      </div>
    </div>
  );
}
