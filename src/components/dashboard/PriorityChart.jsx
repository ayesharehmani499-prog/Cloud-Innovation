import React from "react";
import { ShieldAlert, AlertTriangle, AlertCircle, ArrowDown } from "lucide-react";

export default function PriorityChart({ stats = {} }) {
  const {
    totalIssues = 0,
    criticalIssues = 0,
    highPriorityIssues = 0,
    mediumPriorityIssues = 0,
    lowPriorityIssues = 0
  } = stats;

  const total = totalIssues || 1;

  const priorities = [
    {
      label: "Critical",
      count: criticalIssues,
      icon: ShieldAlert,
      bar: "bg-rose-500",
      border: "border-rose-500/40",
      text: "text-rose-400"
    },
    {
      label: "High",
      count: highPriorityIssues,
      icon: AlertTriangle,
      bar: "bg-amber-500",
      border: "border-amber-500/40",
      text: "text-amber-400"
    },
    {
      label: "Medium",
      count: mediumPriorityIssues,
      icon: AlertCircle,
      bar: "bg-blue-500",
      border: "border-blue-500/40",
      text: "text-blue-400"
    },
    {
      label: "Low",
      count: lowPriorityIssues,
      icon: ArrowDown,
      bar: "bg-slate-500",
      border: "border-slate-500/40",
      text: "text-slate-400"
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Priority Distribution
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Urgency Hierarchy
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {priorities.map((item) => {
          const Icon = item.icon;
          const pct = totalIssues > 0 ? Math.round((item.count / total) * 100) : 0;

          return (
            <div
              key={item.label}
              className={`p-3 rounded-xl bg-slate-950/60 border ${item.border} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  {item.label}
                </span>
                <Icon className={`w-3.5 h-3.5 ${item.text}`} />
              </div>

              <div className="my-2">
                <span className="text-xl font-extrabold text-white font-mono">
                  {item.count}
                </span>
                <span className="text-[10px] text-slate-500 font-mono ml-1.5">
                  ({pct}%)
                </span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${item.bar} rounded-full transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
