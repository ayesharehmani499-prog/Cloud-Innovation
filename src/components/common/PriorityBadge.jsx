import React from "react";
import { PRIORITY_CONFIG } from "../../utils/status.js";
import { AlertCircle, AlertTriangle, ShieldAlert, ArrowDown } from "lucide-react";

export default function PriorityBadge({ priority, size = "md", showIcon = true }) {
  const config = PRIORITY_CONFIG[priority] || {
    label: priority || "Medium",
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/30",
    dot: "bg-slate-400",
    badge: "border-slate-700 bg-slate-800 text-slate-300"
  };

  const icons = {
    Low: ArrowDown,
    Medium: AlertCircle,
    High: AlertTriangle,
    Critical: ShieldAlert
  };

  const IconComponent = icons[priority] || AlertCircle;

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-semibold"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.badge} ${sizeClasses[size] || sizeClasses.md} select-none`}
    >
      {showIcon && (
        <IconComponent
          className={`${iconSizes[size] || iconSizes.md} shrink-0 ${priority === "Critical" ? "text-rose-400 animate-pulse" : ""}`}
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
