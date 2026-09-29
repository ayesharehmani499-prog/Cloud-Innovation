import React from "react";
import { DEPARTMENTS } from "../../utils/status.js";

export default function DepartmentSelect({
  value,
  onChange,
  className = "",
  label = "Department"
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer"
      >
        <option value="">-- Choose Department --</option>
        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
