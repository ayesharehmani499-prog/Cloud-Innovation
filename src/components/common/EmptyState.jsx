import React from "react";
import { Inbox, Plus } from "lucide-react";
import Button from "./Button.jsx";

export default function EmptyState({
  title = "No civic issues found",
  description = "No complaints match your criteria or no reports have been submitted yet.",
  actionLabel,
  onAction,
  icon: Icon = Inbox
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800/80 my-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 mb-4 border border-slate-700/60">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" icon={Plus} size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
