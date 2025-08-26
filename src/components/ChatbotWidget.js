"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ChatbotModal({ open, onClose }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Modal content
  const modal = (
    <>
      {/* Overlay (click outside to close) */}
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed bottom-6 right-6 z-[9999] w-[400px] h-[600px] mb-5 bg-white rounded-xl shadow-2xl border overflow-hidden"
        onClick={(e) => e.stopPropagation()} // prevent overlay close
        role="dialog"
        aria-modal="true"
        aria-label="Support Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
          <span className="font-semibold">Support Chat</span>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center hover:text-yellow-300"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chatbot iframe */}
        <iframe
          src="https://app.supportfast.ai/chatbot-iframe/bot-d7jdvvmtdw"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="StayFeast Support Chat"
        />
      </div>
    </>
  );

  // Render to <body> so it sits above everything
  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
