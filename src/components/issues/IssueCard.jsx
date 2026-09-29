import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import PriorityBadge from "../common/PriorityBadge.jsx";
import { formatDate, formatTimeAgo } from "../../utils/formatDate.js";
import {
  MapPin,
  Clock,
  Building2,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Droplets,
  Trash2,
  Truck,
  Wrench,
  Shield,
  FileQuestion,
  Sparkles
} from "lucide-react";

export default function IssueCard({ issue }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Broken Streetlight":
        return Lightbulb;
      case "Pothole":
      case "Road Damage":
        return Truck;
      case "Water Leakage":
        return Droplets;
      case "Garbage/Waste":
        return Trash2;
      case "Drainage":
        return Wrench;
      case "Traffic/Safety":
      case "Damaged Public Infrastructure":
        return AlertTriangle;
      default:
        return FileQuestion;
    }
  };

  const IconComponent = getCategoryIcon(issue.category);
  const isCritical = issue.priority === "Critical";

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border transition-all duration-200 overflow-hidden shadow-lg shadow-slate-950/40 hover:-translate-y-1 hover:shadow-xl ${
        isCritical
          ? "border-rose-500/40 hover:border-rose-500/70"
          : "border-slate-800 hover:border-cyan-500/40"
      }`}
    >
      {/* Top indicator bar for priority */}
      <div
        className={`h-1 w-full ${
          issue.priority === "Critical"
            ? "bg-rose-500"
            : issue.priority === "High"
            ? "bg-amber-500"
            : issue.priority === "Medium"
            ? "bg-blue-500"
            : "bg-slate-600"
        }`}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Badges and ID Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <StatusBadge status={issue.status} size="sm" />
            <PriorityBadge priority={issue.priority} size="sm" />
          </div>

          <div className="flex items-center gap-1">
            {issue.isDemo && (
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
                title="Simulated sample complaint"
              >
                Demo
              </span>
            )}
            <span className="font-mono text-[11px] text-slate-400 font-semibold">
              #{issue._id || issue.id}
            </span>
          </div>
        </div>

        {/* Title & Category */}
        <div className="flex items-start gap-3 mt-1">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/60 shrink-0 group-hover:scale-105 transition-transform">
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400/90 block">
              {issue.category}
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
              {issue.title}
            </h3>
          </div>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {issue.description || "No further details provided."}
        </p>

        {/* Meta details */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{issue.location}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">
                {issue.assignedDepartment || "Triage Pending"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-500" title={formatDate(issue.createdAt)}>
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(issue.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          Updated: {formatTimeAgo(issue.updatedAt || issue.createdAt)}
        </span>

        <Link
          to={`/issues/${issue._id || issue.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
