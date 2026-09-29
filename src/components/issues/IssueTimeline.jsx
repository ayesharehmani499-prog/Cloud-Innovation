import React from "react";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import { formatDate, formatTimeAgo } from "../../utils/formatDate.js";
import { TIMELINE_STAGES, STATUS_CONFIG } from "../../utils/status.js";

export default function IssueTimeline({ status, timeline = [], resolutionNotes }) {
  const isRejected = status === "Rejected";

  const getStageIndex = (st) => {
    if (st === "Reported") return 0;
    if (st === "Under Review") return 1;
    if (st === "In Progress") return 2;
    if (st === "Resolved") return 3;
    return -1;
  };

  const currentStageIndex = getStageIndex(status);

  return (
    <div className="space-y-6">
      {/* Visual Step Progress Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
          Lifecycle Progression
        </h4>

        {isRejected ? (
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-rose-300">
                Complaint Rejected / Closed
              </p>
              <p className="text-xs text-rose-200/80 mt-0.5">
                This issue was reviewed by municipal triage and determined to be invalid, duplicate, or outside city jurisdiction.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 hidden sm:block">
              <div
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{
                  width: `${(Math.max(0, currentStageIndex) / (TIMELINE_STAGES.length - 1)) * 100}%`
                }}
              />
            </div>

            {/* Stages */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
              {TIMELINE_STAGES.map((stage, idx) => {
                const isCompleted = currentStageIndex > idx || (currentStageIndex === idx && stage === "Resolved");
                const isCurrent = currentStageIndex === idx && stage !== "Resolved";
                const isPending = currentStageIndex < idx;

                return (
                  <div
                    key={stage}
                    className="flex flex-col items-start sm:items-center text-left sm:text-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all mb-2 ${
                        isCompleted
                          ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20"
                          : isCurrent
                          ? "bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/30 animate-pulse"
                          : "bg-slate-800 text-slate-500 border border-slate-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? "text-cyan-400"
                          : isCompleted
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {stage}
                    </span>

                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {isCompleted
                        ? "Completed"
                        : isCurrent
                        ? "In Active State"
                        : "Upcoming"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Activity Log / Audit Trail */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Activity Log & Dispatch Audit Trail
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">
            {timeline.length} Events Logged
          </span>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {timeline.map((event, index) => (
            <div key={index} className="relative flex items-start gap-3.5 pl-1">
              <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 text-cyan-400 flex items-center justify-center shrink-0 z-10">
                <Clock className="w-3 h-3" />
              </div>

              <div className="flex-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white">
                    {event.stage || "Update"}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatDate(event.timestamp)}
                  </span>
                </div>

                {event.actor && (
                  <p className="text-[11px] text-cyan-400 mt-0.5 font-medium">
                    By: {event.actor}
                  </p>
                )}

                {event.note && (
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                    {event.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resolution note callout if resolved */}
        {resolutionNotes && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Official Resolution Sign-off</span>
            </div>
            <p className="mt-2 text-xs text-slate-200 leading-relaxed">
              {resolutionNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
