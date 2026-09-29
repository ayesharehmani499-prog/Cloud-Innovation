import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import PriorityBadge from "../common/PriorityBadge.jsx";
import { formatShortDate } from "../../utils/formatDate.js";
import { Eye, Edit3, Trash2, ArrowRight } from "lucide-react";

export default function IssueTable({
  issues,
  onOpenAssign,
  onOpenStatus,
  onOpenDelete,
  isAuthority = false
}) {
  if (!issues || issues.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/40">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <th className="py-3.5 px-4">ID</th>
            <th className="py-3.5 px-4 min-w-[200px]">Issue Title</th>
            <th className="py-3.5 px-4">Category</th>
            <th className="py-3.5 px-4">Location</th>
            <th className="py-3.5 px-4">Priority</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Department</th>
            <th className="py-3.5 px-4">Reported</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-xs">
          {issues.map((issue) => {
            const id = issue._id || issue.id;
            return (
              <tr
                key={id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* ID */}
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-400 group-hover:text-cyan-400 whitespace-nowrap">
                  #{id}
                </td>

                {/* Title */}
                <td className="py-3.5 px-4">
                  <Link
                    to={`/issues/${id}`}
                    className="font-bold text-white hover:text-cyan-300 transition-colors block line-clamp-1"
                  >
                    {issue.title}
                  </Link>
                  <span className="text-[11px] text-slate-400 line-clamp-1">
                    {issue.description}
                  </span>
                </td>

                {/* Category */}
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] border border-slate-700/60">
                    {issue.category}
                  </span>
                </td>

                {/* Location */}
                <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                  <span className="truncate max-w-[130px] block" title={issue.location}>
                    {issue.location}
                  </span>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <PriorityBadge priority={issue.priority} size="sm" />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={issue.status} size="sm" />
                </td>

                {/* Department */}
                <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                  <span className="text-slate-400">
                    {issue.assignedDepartment || "Unassigned"}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap">
                  {formatShortDate(issue.createdAt)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/issues/${id}`}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      title="Inspect issue details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    {isAuthority && onOpenStatus && (
                      <button
                        type="button"
                        onClick={() => onOpenStatus(issue)}
                        className="p-1.5 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-700/40 transition-colors"
                        title="Update status or assign"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {isAuthority && onOpenDelete && (
                      <button
                        type="button"
                        onClick={() => onOpenDelete(issue)}
                        className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 border border-rose-800/40 transition-colors"
                        title="Delete complaint"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
