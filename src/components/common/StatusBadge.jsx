import React from "react";
import { STATUS_CONFIG } from "../../utils/status.js";

export default function StatusBadge({ status, size = "md", showDot = true }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "Unknown",
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/30",
    dot: "bg-slate-400"
  };

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1.5 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-semibold"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size] || sizeClasses.md} select-none`}
    >
      {showDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${config.dot} shrink-0`}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
