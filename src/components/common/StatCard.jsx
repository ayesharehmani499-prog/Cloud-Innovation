import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // { value: "+12%", positive: true }
  color = "cyan", // cyan, emerald, amber, rose, blue, purple
  onClick
}) {
  const colorMap = {
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
      accent: "text-cyan-400"
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      accent: "text-emerald-400"
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      accent: "text-amber-400"
    },
    rose: {
      border: "border-rose-500/20 hover:border-rose-500/40",
      iconBg: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      accent: "text-rose-400"
    },
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      accent: "text-blue-400"
    },
    purple: {
      border: "border-purple-500/20 hover:border-purple-500/40",
      iconBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      accent: "text-purple-400"
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-slate-900/90 border ${scheme.border} p-5 transition-all duration-200 shadow-lg shadow-slate-950/40 ${
        onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              trend.positive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-400 font-medium">{subtitle}</p>
      )}
    </div>
  );
}
