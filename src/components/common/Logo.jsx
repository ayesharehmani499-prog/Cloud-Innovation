import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ size = "md", showTagline = false, clickable = true }) {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
    xl: "h-14 w-14"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  const logoContent = (
    <div className="flex items-center gap-3 select-none">
      {/* Round 1 Official Civic / Smart-City Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-md shadow-cyan-500/20 text-white shrink-0 ${sizeClasses[size] || sizeClasses.md}`}
        title="CityFix Civic Emblem (Round 1 Official)"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Hexagonal smart city node shield */}
          <path
            d="M16 3L27 9V20L16 29L5 20V9L16 3Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
          {/* Inner civic spire and checkmark */}
          <path
            d="M16 8V16"
            stroke="#67E8F9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M11 16.5L14.5 20L21.5 13"
            stroke="#FDE047"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Satellite communication node dot */}
          <circle cx="16" cy="7" r="1.5" fill="#FFFFFF" />
        </svg>

        {/* Ambient glow accent */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight text-white leading-none ${textSizes[size] || textSizes.md}`}
          >
            CITY<span className="text-cyan-400">FIX</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
            R3
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            Report. Track. Resolve.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-block hover:opacity-95 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
