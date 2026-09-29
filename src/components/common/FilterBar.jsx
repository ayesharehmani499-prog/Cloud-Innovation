import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import {
  ISSUE_CATEGORIES,
  ISSUE_STATUSES,
  ISSUE_PRIORITIES,
  DEPARTMENTS
} from "../../utils/status.js";

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedDepartment,
  onDepartmentChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters = false
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 px-2 py-1 select-none">
        <Filter className="w-3.5 h-3.5 text-cyan-400" />
        <span>Filters:</span>
      </div>

      {/* Category Select */}
      {onCategoryChange && (
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="text-xs bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
        >
          <option value="All">All Categories</option>
          {ISSUE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      {/* Status Select */}
      {onStatusChange && (
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-xs bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
        >
          <option value="All">All Statuses</option>
          {ISSUE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {/* Priority Select */}
      {onPriorityChange && (
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="text-xs bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
        >
          <option value="All">All Priorities</option>
          {ISSUE_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      )}

      {/* Department Select */}
      {onDepartmentChange && (
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="text-xs bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      {/* Sort By */}
      {onSortChange && (
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Highest Priority</option>
            <option value="status">Status Order</option>
          </select>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-cyan-400" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
