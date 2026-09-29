import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/common/Logo.jsx";
import Button from "../components/common/Button.jsx";
import { useIssues } from "../hooks/useIssues.js";
import { useApp } from "../context/AppContext.jsx";
import {
  PlusCircle,
  Compass,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  Lightbulb,
  Droplets,
  Trash2,
  Wrench,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  Users,
  Award
} from "lucide-react";

export default function Home() {
  const { issues, stats, loading } = useIssues();
  const { role } = useApp();

  const categories = [
    { name: "Potholes & Roads", icon: Truck, count: stats.categoryCounts?.["Pothole"] || 0, desc: "Cratered asphalt, paving subsidence" },
    { name: "Broken Streetlights", icon: Lightbulb, count: stats.categoryCounts?.["Broken Streetlight"] || 0, desc: "Dark zones, broken poles, wiring" },
    { name: "Water Leakage", icon: Droplets, count: stats.categoryCounts?.["Water Leakage"] || 0, desc: "Burst pipelines, valve faults" },
    { name: "Garbage & Waste", icon: Trash2, count: stats.categoryCounts?.["Garbage/Waste"] || 0, desc: "Overflowing bins, uncollected refuse" },
    { name: "Storm Drainage", icon: Wrench, count: stats.categoryCounts?.["Drainage"] || 0, desc: "Clogged culverts, broken slabs" },
    { name: "Public Safety", icon: AlertTriangle, count: stats.categoryCounts?.["Traffic/Safety"] || 0, desc: "Hazardous billboards, signals" }
  ];

  const workflowSteps = [
    { num: "01", title: "Report", desc: "Citizen uploads photographic proof & GPS pin in under 60 seconds." },
    { num: "02", title: "Review", desc: "Municipal dispatch cell triages severity and verifies public right-of-way." },
    { num: "03", title: "Assign", desc: "Work order automatically routed to specialized department engineers." },
    { num: "04", title: "Resolve", desc: "Field crew remedies fault with on-site before/after verification." },
    { num: "05", title: "Track", desc: "Citizen and municipal dashboard receive audited sign-off notification." }
  ];

  const resolvedIssues = issues.filter((i) => i.status === "Resolved").slice(0, 3);

  return (
    <div className="space-y-16 py-4">
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smart City Governance • Round 3 Competition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            CITY<span className="text-cyan-400">FIX</span>
          </h1>

          <p className="mt-3 text-xl sm:text-2xl font-bold text-cyan-300">
            Report. Track. Resolve.
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Making every neighborhood safer, cleaner, and better. Empowering citizens to directly report local civic defects and enabling municipal authorities to triage, dispatch, and track resolution transparently.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/report">
              <Button variant="primary" size="lg" icon={PlusCircle}>
                Report an Issue
              </Button>
            </Link>
            <Link to="/issues">
              <Button variant="secondary" size="lg" icon={Compass}>
                Explore Issues Registry
              </Button>
            </Link>
            <Link to="/authority">
              <Button variant="outline" size="lg" icon={ShieldCheck}>
                Authority Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="relative z-10 mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {stats.totalIssues}
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Total Lodged</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.resolvedIssues}
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Resolved Cases</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              {stats.resolutionRate}%
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Resolution Index</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              &lt; 24h
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Avg Response Time</p>
          </div>
        </div>
      </section>

      {/* CIVIC PROBLEM CATEGORIES */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Municipal Domains
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Common Civic Issues Handled
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Categorized intake routed directly to responsible municipal departments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {cat.count} Logged
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW CITYFIX WORKS */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Workflow Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            How CityFix Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            End-to-end accountability loop connecting citizens with field engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-cyan-500/40 font-mono">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY RESOLVED SHOWCASE */}
      {resolvedIssues.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Proven Impact
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Recently Resolved In The City
              </h2>
            </div>
            <Link
              to="/issues?status=Resolved"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>See All Resolved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resolvedIssues.map((issue) => (
              <div
                key={issue._id || issue.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
                      Resolved
                    </span>
                    <span className="text-slate-500 font-mono">
                      #{issue._id || issue.id}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {issue.resolutionNotes || issue.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate">{issue.location}</span>
                  <Link
                    to={`/issues/${issue._id || issue.id}`}
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CITIZEN VS AUTHORITY DUAL BENEFIT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Users className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">For Citizens</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Report issues with 1-click GPS detection and photo evidence.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Track complaint progression from intake to sign-off.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Instant alerts when field engineering teams take action.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link to="/report">
              <Button variant="primary" size="sm">
                File a Complaint
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-blue-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Building className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">For Municipal Authorities</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Smart triage desk with priority scoring and GIS heatmaps.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Direct department routing (Public Works, Electrical, Sanitation).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Auditable resolution metrics & public compliance reporting.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link to="/authority">
              <Button variant="secondary" size="sm">
                Open Command Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Help Build a Responsive, Clean, and Safe City
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Every report contributes directly to municipal resource allocation and civic accountability.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/report">
            <Button variant="primary" size="lg" icon={PlusCircle}>
              REPORT AN ISSUE NOW
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
