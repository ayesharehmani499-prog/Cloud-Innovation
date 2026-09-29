import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingState({
  message = "Loading civic reports...",
  description = "Connecting to municipal records and sync nodes."
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 my-6">
      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <h4 className="text-base font-semibold text-white tracking-tight">{message}</h4>
      {description && (
        <p className="mt-1 text-xs text-slate-400 max-w-sm">{description}</p>
      )}
    </div>
  );
}
