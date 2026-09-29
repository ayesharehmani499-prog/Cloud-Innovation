import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { useToast } from "../../hooks/useToast.js";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
    info: Info
  };

  const styleMap = {
    success: {
      border: "border-emerald-500/40",
      bg: "bg-slate-900/95",
      iconColor: "text-emerald-400",
      accent: "bg-emerald-500"
    },
    warning: {
      border: "border-amber-500/40",
      bg: "bg-slate-900/95",
      iconColor: "text-amber-400",
      accent: "bg-amber-500"
    },
    error: {
      border: "border-rose-500/40",
      bg: "bg-slate-900/95",
      iconColor: "text-rose-400",
      accent: "bg-rose-500"
    },
    info: {
      border: "border-cyan-500/40",
      bg: "bg-slate-900/95",
      iconColor: "text-cyan-400",
      accent: "bg-cyan-500"
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const style = styleMap[toast.type] || styleMap.info;
        const IconComponent = icons[toast.type] || Info;

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto relative overflow-hidden rounded-xl border ${style.border} ${style.bg} p-4 shadow-2xl shadow-slate-950 flex items-start gap-3 backdrop-blur-md transition-all duration-300 transform translate-y-0`}
          >
            <div className={`shrink-0 ${style.iconColor} mt-0.5`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0 pr-4">
              {toast.title && (
                <h5 className="text-xs font-bold text-white tracking-tight uppercase">
                  {toast.title}
                </h5>
              )}
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
