import React from "react";
import Sidebar from "./Sidebar.jsx";
import { X } from "lucide-react";

export default function MobileNav({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-950 shadow-2xl flex flex-col z-50">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Sidebar onCloseMobile={onClose} />
      </div>
    </div>
  );
}
