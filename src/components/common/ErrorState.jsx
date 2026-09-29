import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Button from "./Button.jsx";

export default function ErrorState({
  title = "Unable to load data",
  message = "There was a problem reaching the CityFix backend service.",
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-2xl bg-rose-950/20 border border-rose-500/30 my-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 mb-4 border border-rose-500/30">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs text-rose-200/80 max-w-md font-mono">
        {message}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="secondary"
            size="sm"
            icon={RotateCcw}
            onClick={onRetry}
          >
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}
