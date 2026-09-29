import React from "react";
import { Activity } from "lucide-react";

export default function StatusChart({ stats = {} }) {
  const {
    totalIssues = 0,
    reportedIssues = 0,
    underReviewIssues = 0,
    inProgressIssues = 0,
    resolvedIssues = 0,
    rejectedIssues = 0
  } = stats;

  const total = totalIssues || 1;

  const statuses = [
    { label: "Reported", count: reportedIssues, color: "bg-blue-500", text: "text-blue-400" },
    { label: "Under Review", count: underReviewIssues, color: "bg-amber-500", text: "text-amber-400" },
    { label: "In Progress", count: inProgressIssues, color: "bg-cyan-500", text: "text-cyan-400" },
    { label: "Resolved", count: resolvedIssues, color: "bg-emerald-500", text: "text-emerald-400" },
    { label: "Rejected", count: rejectedIssues, color: "bg-rose-500", text: "text-rose-400" }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Status Breakdown
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {totalIssues} Total
        </span>
      </div>

      {/* Multi-segment stacked progress bar */}
      <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex mb-5">
        {statuses.map((st) => {
          const width = totalIssues > 0 ? (st.count / total) * 100 : 0;
          if (width === 0) return null;
          return (
            <div
              key={st.label}
              className={`h-full ${st.color} transition-all duration-500`}
              style={{ width: `${width}%` }}
              title={`${st.label}: ${st.count} (${Math.round(width)}%)`}
            />
          );
        })}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {statuses.map((st) => {
          const pct = totalIssues > 0 ? Math.round((st.count / total) * 100) : 0;
          return (
            <div
              key={st.label}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${st.color}`} />
                <span className="text-[11px] font-medium text-slate-400 truncate">
                  {st.label}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white font-mono">
                  {st.count}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
