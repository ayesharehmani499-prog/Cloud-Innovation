import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatDate.js";
import { Activity, ArrowRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function ActivityFeed({ issues = [] }) {
  // Aggregate recent activities from issue timelines
  const activities = [];

  issues.forEach((issue) => {
    if (Array.isArray(issue.timeline)) {
      issue.timeline.forEach((event) => {
        activities.push({
          issueId: issue._id || issue.id,
          issueTitle: issue.title,
          category: issue.category,
          stage: event.stage,
          actor: event.actor,
          note: event.note,
          timestamp: event.timestamp || issue.updatedAt || issue.createdAt
        });
      });
    }
  });

  // Sort newest first
  activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const displayList = activities.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Live Civic Activity Stream
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Field Dispatch
        </span>
      </div>

      {displayList.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center">
          No recent activity recorded
        </p>
      ) : (
        <div className="space-y-3">
          {displayList.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0 mt-0.5">
                {item.stage === "Resolved" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : item.stage === "In Progress" ? (
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white truncate">
                    {item.stage}: {item.issueTitle}
                  </span>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {item.note || `Transitioned to ${item.stage}`}
                </p>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400/90 font-mono">
                    By {item.actor || "Authority Staff"}
                  </span>
                  <Link
                    to={`/issues/${item.issueId}`}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
