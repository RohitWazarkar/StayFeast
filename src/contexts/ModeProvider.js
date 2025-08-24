"use client";
import { createContext, useContext, useState } from "react";

// create context
const ModeContext = createContext();

// provider
export function ModeProvider({ children }) {
  const [mode, setMode] = useState("online"); // "online" | "offline"

  const toggleMode = () => {
    setMode((prev) => (prev === "online" ? "offline" : "online"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

// custom hook
export function useMode() {
  return useContext(ModeContext);
}
