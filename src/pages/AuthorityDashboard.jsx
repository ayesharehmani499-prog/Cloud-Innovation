import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIssues } from "../hooks/useIssues.js";
import { useApp } from "../context/AppContext.jsx";
import StatCard from "../components/common/StatCard.jsx";
import IssueTable from "../components/issues/IssueTable.jsx";
import AssignmentPanel from "../components/authority/AssignmentPanel.jsx";
import ResolutionPanel from "../components/authority/ResolutionPanel.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import Button from "../components/common/Button.jsx";
import FilterBar from "../components/common/FilterBar.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import {
  ShieldAlert,
  Clock,
  Wrench,
  CheckCircle2,
  Building2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  UserCheck,
  Award
} from "lucide-react";

export default function AuthorityDashboard() {
  const { role, changeRole, currentUser } = useApp();
  const {
    issues,
    filteredIssues,
    stats,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    setSortBy,
    clearFilters,
    refetch,
    assignDepartment,
    resolveIssue,
    deleteIssue,
    updateStatus
  } = useIssues();

  // Modals
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [rejectConfirmOpen, setRejectConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleOpenAssign = (issue) => {
    setSelectedIssue(issue);
    setAssignModalOpen(true);
  };

  const handleOpenResolve = (issue) => {
    setSelectedIssue(issue);
    setResolveModalOpen(true);
  };

  const handleOpenDelete = (issue) => {
    setSelectedIssue(issue);
    setDeleteConfirmOpen(true);
  };

  const handleOpenReject = (issue) => {
    setSelectedIssue(issue);
    setRejectConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedIssue) return;
    setActionLoading(true);
    await deleteIssue(selectedIssue._id || selectedIssue.id);
    setActionLoading(false);
    setDeleteConfirmOpen(false);
    setSelectedIssue(null);
  };

  const handleConfirmReject = async () => {
    if (!selectedIssue) return;
    setActionLoading(true);
    await updateStatus(
      selectedIssue._id || selectedIssue.id,
      "Rejected",
      "Rejected during official authority triage (duplicate or out of scope)."
    );
    setActionLoading(false);
    setRejectConfirmOpen(false);
    setSelectedIssue(null);
  };

  // Critical issues list
  const criticalList = issues.filter((i) => i.priority === "Critical" && i.status !== "Resolved");

  // Pending assignment list
  const pendingAssignmentList = issues.filter(
    (i) => (!i.assignedDepartment || i.assignedDepartment === "Unassigned") && i.status !== "Resolved"
  );

  return (
    <div className="space-y-8">
      {/* Authority Command Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Municipal Dispatch & Operations Command</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Authority Governance Desk
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.designation || "Municipal Authority"})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {role !== "authority" && (
            <Button
              variant="outline"
              size="sm"
              icon={UserCheck}
              onClick={() => changeRole("authority")}
            >
              Switch to Authority View
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={refetch}
          >
            Sync Data
          </Button>
        </div>
      </div>

      {/* Authority 8-Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Complaints"
          value={stats.totalIssues}
          subtitle="All received complaints"
          icon={Building2}
          color="cyan"
        />

        <StatCard
          title="New Reports"
          value={stats.reportedIssues}
          subtitle="Awaiting triage review"
          icon={Clock}
          color="blue"
        />

        <StatCard
          title="Under Review"
          value={stats.underReviewIssues}
          subtitle="Department dispatch queued"
          icon={AlertTriangle}
          color="amber"
        />

        <StatCard
          title="In Progress"
          value={stats.inProgressIssues}
          subtitle="Field crew active"
          icon={Wrench}
          color="cyan"
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedIssues}
          subtitle="Signed off with proof"
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="High Priority"
          value={stats.highPriorityIssues}
          subtitle="Elevated urgency"
          icon={AlertTriangle}
          color="amber"
        />

        <StatCard
          title="Critical Issues"
          value={stats.criticalIssues}
          subtitle="Immediate hazard alert"
          icon={ShieldAlert}
          color="rose"
        />

        <StatCard
          title="Resolution Rate"
          value={`${stats.resolutionRate}%`}
          subtitle="Municipal success index"
          icon={CheckCircle2}
          color="emerald"
          trend={{ value: `${stats.resolutionRate}%`, positive: stats.resolutionRate >= 50 }}
        />
      </div>

      {/* Critical Attention Banner */}
      {criticalList.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {criticalList.length} Critical Public Hazards Requiring Immediate Action
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criticalList.map((crit) => (
              <div
                key={crit._id || crit.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-rose-400 font-bold">
                      #{crit._id || crit.id}
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      {crit.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {crit.location} • Dept: {crit.assignedDepartment || "Unassigned"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-1 px-2.5 h-7"
                    onClick={() => handleOpenAssign(crit)}
                  >
                    Assign
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    className="text-xs py-1 px-2.5 h-7"
                    onClick={() => handleOpenResolve(crit)}
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Workload Summary */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>Department Workload & Active Dispatches</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(stats.departmentCounts || {}).map(([dept, count]) => (
            <div
              key={dept}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800"
            >
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                {dept}
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {count} active cases
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Authority Management Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">
            Authority Operations Triage Table
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {filteredIssues.length} Complaints Filtered
          </span>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
          hasActiveFilters={
            selectedCategory !== "All" ||
            selectedStatus !== "All" ||
            selectedPriority !== "All" ||
            selectedDepartment !== "All"
          }
        />

        <IssueTable
          issues={filteredIssues}
          isAuthority={true}
          onOpenAssign={handleOpenAssign}
          onOpenStatus={handleOpenResolve}
          onOpenDelete={handleOpenDelete}
        />
      </div>

      {/* Assignment Modal */}
      <AssignmentPanel
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        issue={selectedIssue}
        onAssign={assignDepartment}
      />

      {/* Resolution Modal */}
      <ResolutionPanel
        isOpen={resolveModalOpen}
        onClose={() => setResolveModalOpen(false)}
        issue={selectedIssue}
        onResolve={resolveIssue}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Issue from Registry"
        message={`Confirm permanent deletion of issue #${selectedIssue?._id || selectedIssue?.id}?`}
        confirmText="Delete Issue"
        confirmVariant="danger"
        loading={actionLoading}
      />
    </div>
  );
}
