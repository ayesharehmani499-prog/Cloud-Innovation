import React, { useState, useMemo } from "react";
import { useIssues } from "../hooks/useIssues.js";
import StatCard from "../components/common/StatCard.jsx";
import CategoryChart from "../components/dashboard/CategoryChart.jsx";
import StatusChart from "../components/dashboard/StatusChart.jsx";
import PriorityChart from "../components/dashboard/PriorityChart.jsx";
import ResolutionRate from "../components/dashboard/ResolutionRate.jsx";
import Button from "../components/common/Button.jsx";
import {
  BarChart3,
  Calendar,
  RotateCcw,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  PieChart
} from "lucide-react";

export default function Analytics() {
  const { issues, stats, refetch } = useIssues();
  const [dateRange, setDateRange] = useState("30 Days");

  // Location breakdown
  const locationCounts = useMemo(() => {
    const counts = {};
    issues.forEach((i) => {
      const loc = i.location || "Central";
      counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [issues]);

  const dateRanges = ["Today", "7 Days", "30 Days", "3 Months", "All Time"];

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Civic Performance Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            City Governance Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive resolution velocities, sector distribution, and geospatial density metrics.
          </p>
        </div>

        {/* Date Range Selector & Refresh */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {dateRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  dateRange === range
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={refetch}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Total Reports"
          value={stats.totalIssues}
          subtitle={`Window: ${dateRange}`}
          icon={BarChart3}
          color="cyan"
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedIssues}
          subtitle="Closed work orders"
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="Pending"
          value={stats.reportedIssues + stats.underReviewIssues}
          subtitle="Awaiting action"
          icon={Clock}
          color="amber"
        />

        <StatCard
          title="Critical"
          value={stats.criticalIssues}
          subtitle="Urgent public risk"
          icon={AlertTriangle}
          color="rose"
        />

        <StatCard
          title="Resolution Rate"
          value={`${stats.resolutionRate}%`}
          subtitle="Success index"
          icon={TrendingUp}
          color="emerald"
        />

        <StatCard
          title="Avg Turnaround"
          value="18.4 hrs"
          subtitle="Intake to sign-off"
          icon={Clock}
          color="blue"
        />
      </div>

      {/* Core Analytical Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryChart categoryCounts={stats.categoryCounts} />
        <StatusChart stats={stats} />
        <ResolutionRate
          resolved={stats.resolvedIssues}
          total={stats.totalIssues}
          rate={stats.resolutionRate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Chart */}
        <PriorityChart stats={stats} />

        {/* Location & Hotspot Density */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Geographic Incident Density
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Ward Hotspots
            </span>
          </div>

          <div className="space-y-3">
            {locationCounts.slice(0, 6).map(([loc, count]) => {
              const pct = stats.totalIssues > 0 ? Math.round((count / stats.totalIssues) * 100) : 0;
              return (
                <div key={loc} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate">
                      {loc}
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {count} incidents ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
