import React from "react";
import StatCard from "../common/StatCard.jsx";
import {
  FileText,
  Clock,
  Wrench,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldAlert
} from "lucide-react";

export default function OverviewStats({ stats }) {
  const {
    totalIssues = 0,
    reportedIssues = 0,
    underReviewIssues = 0,
    inProgressIssues = 0,
    resolvedIssues = 0,
    rejectedIssues = 0,
    criticalIssues = 0,
    resolutionRate = 0
  } = stats || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Complaints"
        value={totalIssues}
        subtitle="All logged civic issues"
        icon={FileText}
        color="cyan"
      />

      <StatCard
        title="Reported"
        value={reportedIssues}
        subtitle="Awaiting triage & review"
        icon={Clock}
        color="blue"
      />

      <StatCard
        title="In Remediation"
        value={inProgressIssues + underReviewIssues}
        subtitle={`${inProgressIssues} active, ${underReviewIssues} in review`}
        icon={Wrench}
        color="amber"
      />

      <StatCard
        title="Resolved"
        value={resolvedIssues}
        subtitle={`${resolutionRate}% resolution efficiency`}
        icon={CheckCircle2}
        color="emerald"
        trend={{ value: `${resolutionRate}%`, positive: resolutionRate >= 50 }}
      />
    </div>
  );
}
