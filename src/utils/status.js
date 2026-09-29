export const ISSUE_STATUSES = [
  "Reported",
  "Under Review",
  "In Progress",
  "Resolved",
  "Rejected"
];

export const ISSUE_PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Critical"
];

export const ISSUE_CATEGORIES = [
  "Pothole",
  "Broken Streetlight",
  "Water Leakage",
  "Garbage/Waste",
  "Road Damage",
  "Drainage",
  "Damaged Public Infrastructure",
  "Traffic/Safety",
  "Public Property",
  "Other"
];

export const DEPARTMENTS = [
  "Public Works",
  "Electrical",
  "Water Supply",
  "Sanitation",
  "Roads & Transport",
  "Drainage",
  "Emergency Services",
  "Other"
];

export const STATUS_CONFIG = {
  Reported: {
    label: "Reported",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
    description: "Issue submitted and queued for municipal triage."
  },
  "Under Review": {
    label: "Under Review",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    description: "Authorities evaluating severity and assigning department."
  },
  "In Progress": {
    label: "In Progress",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
    description: "Field team deployed and actively performing remedial works."
  },
  Resolved: {
    label: "Resolved",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    description: "Issue inspected, repaired, and signed off with resolution proof."
  },
  Rejected: {
    label: "Rejected",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    dot: "bg-rose-400",
    description: "Duplicate report or outside municipal jurisdiction."
  }
};

export const PRIORITY_CONFIG = {
  Low: {
    label: "Low",
    bg: "bg-slate-500/10",
    text: "text-slate-300",
    border: "border-slate-500/30",
    dot: "bg-slate-400",
    badge: "border-slate-700 bg-slate-800/80 text-slate-300"
  },
  Medium: {
    label: "Medium",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
    badge: "border-blue-700/50 bg-blue-950/60 text-blue-300"
  },
  High: {
    label: "High",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    badge: "border-amber-700/50 bg-amber-950/60 text-amber-300"
  },
  Critical: {
    label: "Critical",
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/40",
    dot: "bg-rose-500 animate-pulse",
    badge: "border-rose-600/60 bg-rose-950/80 text-rose-300 font-semibold shadow-sm shadow-rose-950"
  }
};

export const TIMELINE_STAGES = [
  "Reported",
  "Under Review",
  "In Progress",
  "Resolved"
];
