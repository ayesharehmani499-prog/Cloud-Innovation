import React from "react";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function ResolutionRate({ resolved = 0, total = 0, rate = 0 }) {
  // SVG circular gauge
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Resolution Efficiency
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Live Metric
        </span>
      </div>

      <div className="flex items-center justify-around py-4">
        {/* Circular Gauge */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(30, 41, 59, 0.8)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Value circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white font-mono">
              {rate}%
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              Solved
            </span>
          </div>
        </div>

        {/* Breakdown details */}
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Closed Cases</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {resolved}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Total Reported</span>
            <span className="text-base font-bold text-white font-mono">
              {total}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        Formula: <code className="text-slate-300 font-mono">(Resolved / Total) × 100</code>
      </div>
    </div>
  );
}
