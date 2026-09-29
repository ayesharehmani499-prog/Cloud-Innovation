import React from "react";
import IssueForm from "../components/issues/IssueForm.jsx";
import { useIssues } from "../hooks/useIssues.js";
import { AlertCircle, ShieldAlert, Award } from "lucide-react";

export default function ReportIssue() {
  const { createIssue, loading } = useIssues();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title & Guidelines */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>Citizen Redressal Intake</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Lodge Civic Defect / Public Complaint
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Report road craters, defunct streetlights, pipeline bursts, or uncollected garbage. Your submission is assigned an official tracking ID and dispatched to the municipal zonal team.
        </p>
      </div>

      {/* Main Form */}
      <IssueForm onSubmit={createIssue} loading={loading} />
    </div>
  );
}
