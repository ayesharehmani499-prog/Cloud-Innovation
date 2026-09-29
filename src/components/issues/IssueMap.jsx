import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import PriorityBadge from "../common/PriorityBadge.jsx";
import { PRIORITY_CONFIG } from "../../utils/status.js";
import {
  MapPin,
  Layers,
  Crosshair,
  AlertTriangle,
  ExternalLink,
  X,
  Compass,
  Maximize2
} from "lucide-react";

export default function IssueMap({ issues = [] }) {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Pre-mapped visual coordinates on a normalized 1000x600 SVG grid for each known area
  const getMapCoordinates = (issue, index) => {
    // If real lat/lng exists, project relative to city center (e.g. Patna / Smart City zone ~ 25.60, 85.13)
    if (issue.coordinates && issue.coordinates.lat && issue.coordinates.lng) {
      const x = Math.min(
        920,
        Math.max(80, 500 + (issue.coordinates.lng - 85.135) * 6000)
      );
      const y = Math.min(
        540,
        Math.max(60, 300 - (issue.coordinates.lat - 25.605) * 6000)
      );
      return { x, y };
    }

    // Default positions spread over city sectors based on index
    const positions = [
      { x: 380, y: 220 }, // Patna Main Road
      { x: 620, y: 190 }, // Gandhi Chowk
      { x: 340, y: 380 }, // Station Road
      { x: 740, y: 310 }, // Market Area
      { x: 230, y: 160 }, // Ashiana Road
      { x: 490, y: 280 }, // Boring Road
      { x: 680, y: 440 }, // Kankarbagh
      { x: 550, y: 410 }, // Central Circle
      { x: 810, y: 240 }  // Industrial Ring
    ];

    return positions[index % positions.length];
  };

  const filteredIssues = issues.filter((i) => {
    if (activeFilter === "All") return true;
    return i.priority === activeFilter;
  });

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Map Control Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Smart City GIS Geo-Grid
            </h3>
            <p className="text-[11px] text-slate-400">
              Interactive civic complaint mapping & zone density
            </p>
          </div>
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Critical", "High", "Medium", "Low"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveFilter(level)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === level
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div className="relative w-full h-[450px] sm:h-[520px] bg-[#070b14] overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Background */}
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(30, 41, 59, 0.4)"
                strokeWidth="1"
              />
            </pattern>
            {/* Radial Radar Sweep Gradient */}
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1000" height="600" fill="url(#grid-pattern)" />
          <circle cx="500" cy="300" r="280" fill="url(#radar-glow)" />

          {/* River / Water Canal */}
          <path
            d="M 0 100 Q 250 80 450 140 T 800 120 T 1000 90"
            fill="none"
            stroke="#0e7490"
            strokeWidth="28"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <text
            x="480"
            y="125"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.6"
          >
            NORTH BASIN RIVER
          </text>

          {/* Arterial Highway Network */}
          {/* Ring Road */}
          <circle
            cx="500"
            cy="300"
            r="230"
            fill="none"
            stroke="#334155"
            strokeWidth="3.5"
            strokeDasharray="8 4"
            opacity="0.7"
          />
          {/* Main East-West Express Highway */}
          <path
            d="M 50 300 L 950 300"
            stroke="#475569"
            strokeWidth="4"
            opacity="0.8"
          />
          {/* North-South Central Corridor */}
          <path
            d="M 500 50 L 500 550"
            stroke="#475569"
            strokeWidth="4"
            opacity="0.8"
          />
          {/* Diagonal Avenues */}
          <path
            d="M 180 120 L 820 480"
            stroke="#334155"
            strokeWidth="2.5"
            opacity="0.6"
          />
          <path
            d="M 180 480 L 820 120"
            stroke="#334155"
            strokeWidth="2.5"
            opacity="0.6"
          />

          {/* Secondary Street Blocks */}
          <rect
            x="200"
            y="200"
            width="120"
            height="80"
            rx="8"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <rect
            x="360"
            y="330"
            width="100"
            height="120"
            rx="8"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <rect
            x="540"
            y="170"
            width="140"
            height="90"
            rx="8"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <rect
            x="680"
            y="320"
            width="130"
            height="110"
            rx="8"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Sector Zone Labels */}
          <text x="215" y="245" fill="#64748b" fontSize="10" fontWeight="bold">
            ZONE A • CIVIL
          </text>
          <text x="375" y="395" fill="#64748b" fontSize="10" fontWeight="bold">
            ZONE B • TRANSIT
          </text>
          <text x="555" y="215" fill="#64748b" fontSize="10" fontWeight="bold">
            ZONE C • COMMERCIAL
          </text>
          <text x="695" y="375" fill="#64748b" fontSize="10" fontWeight="bold">
            ZONE D • RESIDENTIAL
          </text>

          {/* Interactive Issue Markers */}
          {filteredIssues.map((issue, idx) => {
            const { x, y } = getMapCoordinates(issue, idx);
            const isSelected =
              selectedIssue &&
              (selectedIssue._id === issue._id || selectedIssue.id === issue.id);
            const isCritical = issue.priority === "Critical";
            const isHigh = issue.priority === "High";

            const pinColor = isCritical
              ? "#f43f5e"
              : isHigh
              ? "#f59e0b"
              : issue.priority === "Medium"
              ? "#3b82f6"
              : "#64748b";

            return (
              <g
                key={issue._id || issue.id || idx}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedIssue(issue)}
                className="cursor-pointer group"
              >
                {/* Pulse wave for critical issues */}
                {isCritical && (
                  <circle
                    r="24"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="r"
                      values="12;28"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.9;0"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Marker outer circle */}
                <circle
                  r={isSelected ? "18" : "14"}
                  fill={pinColor}
                  className="transition-all duration-200"
                  stroke="#0b0f19"
                  strokeWidth="3"
                />

                {/* Center dot / indicator */}
                <circle r={isSelected ? "7" : "5"} fill="#ffffff" />

                {/* Hover label pill */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <rect
                    x="-60"
                    y="-42"
                    width="120"
                    height="22"
                    rx="5"
                    fill="#0f172a"
                    stroke={pinColor}
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="-28"
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="9.5"
                    fontWeight="bold"
                  >
                    {issue.category}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Map Legend Floating Box */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-lg text-[11px] text-slate-300 space-y-1.5 pointer-events-auto">
          <div className="font-semibold text-white uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Map Severity Key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Critical Severity (Immediate Alert)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Low Priority</span>
          </div>
        </div>

        {/* Selected Issue Preview Modal / Flyout */}
        {selectedIssue && (
          <div className="absolute top-4 right-4 max-w-sm w-full bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-2xl z-20 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <StatusBadge status={selectedIssue.status} size="sm" />
                <PriorityBadge priority={selectedIssue.priority} size="sm" />
              </div>
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2.5">
              <span className="text-[10px] font-mono text-cyan-400">
                #{selectedIssue._id || selectedIssue.id} • {selectedIssue.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                {selectedIssue.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {selectedIssue.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{selectedIssue.location}</span>
              </div>
              <div>
                Department:{" "}
                <span className="text-slate-200">
                  {selectedIssue.assignedDepartment || "Pending"}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <Link
                to={`/issues/${selectedIssue._id || selectedIssue.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Inspect Full Complaint</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
