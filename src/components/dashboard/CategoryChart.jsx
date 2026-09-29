import React from "react";
import { PieChart, Tag } from "lucide-react";

export default function CategoryChart({ categoryCounts = {} }) {
  const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((acc, [, val]) => acc + val, 0) || 1;

  const colorPalette = [
    { bar: "bg-cyan-500", text: "text-cyan-400" },
    { bar: "bg-blue-500", text: "text-blue-400" },
    { bar: "bg-indigo-500", text: "text-indigo-400" },
    { bar: "bg-amber-500", text: "text-amber-400" },
    { bar: "bg-emerald-500", text: "text-emerald-400" },
    { bar: "bg-rose-500", text: "text-rose-400" },
    { bar: "bg-purple-500", text: "text-purple-400" }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Complaints by Category
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {entries.length} Sectors
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          No categories registered
        </div>
      ) : (
        <div className="space-y-3">
          {entries.slice(0, 6).map(([category, count], idx) => {
            const percentage = Math.round((count / total) * 100);
            const color = colorPalette[idx % colorPalette.length];

            return (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300 truncate max-w-[180px]">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">
                      {count}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color.bar} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
