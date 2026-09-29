import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useIssues } from "../hooks/useIssues.js";
import { useApp } from "../context/AppContext.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";
import PriorityBadge from "../components/common/PriorityBadge.jsx";
import IssueTimeline from "../components/issues/IssueTimeline.jsx";
import IssueStatusControl from "../components/issues/IssueStatusControl.jsx";
import IssuePriorityControl from "../components/issues/IssuePriorityControl.jsx";
import AssignmentPanel from "../components/authority/AssignmentPanel.jsx";
import ResolutionPanel from "../components/authority/ResolutionPanel.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import Button from "../components/common/Button.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import { formatDate, formatTimeAgo } from "../utils/formatDate.js";
import {
  MapPin,
  Calendar,
  Building2,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Shield,
  Trash2,
  CheckCircle2,
  Share2,
  FileText,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { useToast } from "../hooks/useToast.js";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { role } = useApp();
  const {
    issues,
    loading: issuesLoading,
    updateStatus,
    updatePriority,
    assignDepartment,
    resolveIssue,
    deleteIssue
  } = useIssues();

  // Find issue by either _id or id
  const issue = issues.find((i) => (i._id === id || i.id === id));

  // Authority Modals
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const isAuthority = role === "authority";

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Issue tracking link copied to clipboard!");
    } else {
      toast.info(`Tracking ID: #${issue?._id || issue?.id}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!issue) return;
    setActionLoading(true);
    await deleteIssue(issue._id || issue.id);
    setActionLoading(false);
    setDeleteConfirmOpen(false);
    navigate("/issues");
  };

  if (issuesLoading && !issue) {
    return <LoadingState message="Fetching Complaint Dossier..." />;
  }

  if (!issue) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <ErrorState
          title="Complaint Record Not Found"
          message={`Unable to locate issue #${id} in municipal records. It may have been archived or removed.`}
          onRetry={() => navigate("/issues")}
        />
        <div className="text-center mt-4">
          <Link to="/issues">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Return to Issues Registry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back and Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <Link
          to="/issues"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Registry</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Share2}
            onClick={handleShare}
            className="text-xs text-slate-400 hover:text-white"
          >
            Share Link
          </Button>

          {isAuthority && (
            <>
              <Button
                variant="outline"
                size="sm"
                icon={Building2}
                onClick={() => setAssignModalOpen(true)}
              >
                Assign Department
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle2}
                onClick={() => setResolveModalOpen(true)}
              >
                Resolve Issue
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => setDeleteConfirmOpen(true)}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Issue Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={issue.status} size="lg" />
            <PriorityBadge priority={issue.priority} size="lg" />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
              {issue.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {issue.isDemo && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Sandbox Record
              </span>
            )}
            <span className="font-mono text-sm text-slate-400 font-bold bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              #{issue._id || issue.id}
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
          {issue.title}
        </h2>

        {/* Location & Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{issue.location}</span>
          </div>

          {issue.address && issue.address !== issue.location && (
            <div className="text-slate-400">
              ({issue.address})
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Reported {formatDate(issue.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
            <span>Last Activity: {formatTimeAgo(issue.updatedAt || issue.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description, Evidence Image, Reporter info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Problem Description */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Full Description & Field Observations</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {issue.description}
            </p>
          </div>

          {/* Photographic Evidence if attached */}
          {issue.imageUrl && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Photographic Proof / Site Evidence
              </h3>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                <img
                  src={issue.imageUrl}
                  alt={issue.title}
                  className="w-full max-h-96 object-cover"
                />
              </div>
            </div>
          )}

          {/* Timeline & Audit History */}
          <IssueTimeline
            status={issue.status}
            timeline={issue.timeline || []}
            resolutionNotes={issue.resolutionNotes}
          />
        </div>

        {/* Right Column: Municipal Dispatch & Authority Controls */}
        <div className="space-y-6">
          {/* Department & Assignment Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Municipal Work Order</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Department:</span>
                <span className="text-sm font-bold text-white">
                  {issue.assignedDepartment || "Triage Pending (Unassigned)"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Authority / Lead:</span>
                <span className="text-xs text-slate-200">
                  {issue.assignedAuthority || "Awaiting Engineer Allocation"}
                </span>
              </div>

              {issue.coordinates && (
                <div>
                  <span className="text-slate-400 block text-[11px]">GIS Geo-Fix:</span>
                  <span className="font-mono text-[11px] text-cyan-400">
                    Lat: {issue.coordinates.lat}, Lng: {issue.coordinates.lng}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Citizen Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Lodged By</span>
            </h3>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-white text-sm">
                {issue.reporterName || "Anonymous Citizen"}
              </p>
              {issue.reporterEmail && (
                <p className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{issue.reporterEmail}</span>
                </p>
              )}
              {issue.reporterPhone && (
                <p className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{issue.reporterPhone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Authority Workflow Controls (Always active in Authority role) */}
          {isAuthority && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Authority Management Actions</span>
              </div>

              <IssueStatusControl
                currentStatus={issue.status}
                onUpdateStatus={(st, notes) => updateStatus(issue._id || issue.id, st, notes)}
              />

              <IssuePriorityControl
                currentPriority={issue.priority}
                onUpdatePriority={(pr) => updatePriority(issue._id || issue.id, pr)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      <AssignmentPanel
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        issue={issue}
        onAssign={assignDepartment}
      />

      {/* Resolution Modal */}
      <ResolutionPanel
        isOpen={resolveModalOpen}
        onClose={() => setResolveModalOpen(false)}
        issue={issue}
        onResolve={resolveIssue}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Issue"
        message="Are you sure you want to permanently delete this issue from the municipal registry?"
        confirmText="Delete Issue"
        confirmVariant="danger"
        loading={actionLoading}
      />
    </div>
  );
}
