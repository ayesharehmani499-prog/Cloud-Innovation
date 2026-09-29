import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search complaints by title, ID, category, or area...",
  className = ""
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={onClear || (() => onChange(""))}
          className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
