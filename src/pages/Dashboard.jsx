import React from "react";
import { Link } from "react-router-dom";
import { useIssues } from "../hooks/useIssues.js";
import OverviewStats from "../components/dashboard/OverviewStats.jsx";
import RecentIssues from "../components/dashboard/RecentIssues.jsx";
import CategoryChart from "../components/dashboard/CategoryChart.jsx";
import StatusChart from "../components/dashboard/StatusChart.jsx";
import PriorityChart from "../components/dashboard/PriorityChart.jsx";
import ResolutionRate from "../components/dashboard/ResolutionRate.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";
import IssueMap from "../components/issues/IssueMap.jsx";
import Button from "../components/common/Button.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import {
  PlusCircle,
  FileText,
  ListFilter,
  ShieldCheck,
  BarChart3,
  RotateCcw,
  MapPin,
  Sparkles
} from "lucide-react";

export default function Dashboard() {
  const { issues, stats, loading, error, refetch, isFromBackend } = useIssues();

  if (loading && issues.length === 0) {
    return <LoadingState message="Loading CityFix Governance Metrics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Civic Operations Dashboard
            </h2>
            {isFromBackend ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Live MongoDB
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Competition Sandbox
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time municipal issue telemetry, department workloads, and citizen resolution indexes.
          </p>
        </div>

        {/* Quick Action Ribbon */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={refetch}
            title="Refresh issues and telemetry"
          >
            Refresh
          </Button>

          <Link to="/report">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Report Issue
            </Button>
          </Link>

          <Link to="/my-reports">
            <Button variant="secondary" size="sm" icon={FileText}>
              My Reports
            </Button>
          </Link>

          <Link to="/authority">
            <Button variant="outline" size="sm" icon={ShieldCheck}>
              Authority Triage
            </Button>
          </Link>

          <Link to="/analytics">
            <Button variant="ghost" size="sm" icon={BarChart3}>
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {error && !isFromBackend && (
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
          <span>Backend notice: {error} (Serving verified sandbox data)</span>
          <Button variant="ghost" size="sm" onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* Primary Overview Metric Cards */}
      <OverviewStats stats={stats} />

      {/* Middle Grid: Category Breakdown + Status Stack + Resolution Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryChart categoryCounts={stats.categoryCounts} />
        <StatusChart stats={stats} />
        <ResolutionRate
          resolved={stats.resolvedIssues}
          total={stats.totalIssues}
          rate={stats.resolutionRate}
        />
      </div>

      {/* Priority Distribution */}
      <PriorityChart stats={stats} />

      {/* Interactive GIS City Grid Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              City Geographic Incidents Map
            </h3>
          </div>
          <Link
            to="/issues"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            View in Registry →
          </Link>
        </div>
        <IssueMap issues={issues} />
      </div>

      {/* Bottom Grid: Recent Issues & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentIssues issues={issues} />
        </div>
        <div>
          <ActivityFeed issues={issues} />
        </div>
      </div>
    </div>
  );
}
