import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 focus:ring-cyan-500 border border-cyan-400/30",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 focus:ring-slate-600",
    outline:
      "bg-transparent hover:bg-slate-800/80 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 focus:ring-cyan-500",
    success:
      "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 focus:ring-emerald-500 border border-emerald-500/40",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 focus:ring-rose-500 border border-rose-500/40",
    warning:
      "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 focus:ring-amber-500 border border-amber-500/40",
    ghost:
      "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white focus:ring-slate-700"
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-5 py-3 gap-2.5 font-semibold"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
