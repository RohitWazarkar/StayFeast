"use client";
import { useEffect, useState } from "react";

export default function SessionTimer() {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    // Get session start time from localStorage
    let start = localStorage.getItem("sessionStart");
    if (!start) {
      // If not set, set it now
      start = Date.now();
      localStorage.setItem("sessionStart", start);
    }

    const interval = setInterval(() => {
      const diff = Date.now() - parseInt(start, 10);
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setElapsed(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-sm text-white">{elapsed}</span>;
}
