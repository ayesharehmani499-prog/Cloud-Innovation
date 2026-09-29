import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIssues } from "../hooks/useIssues.js";
import { useApp } from "../context/AppContext.jsx";
import IssueCard from "../components/issues/IssueCard.jsx";
import IssueTable from "../components/issues/IssueTable.jsx";
import IssueMap from "../components/issues/IssueMap.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import FilterBar from "../components/common/FilterBar.jsx";
import Pagination from "../components/common/Pagination.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import AssignmentPanel from "../components/authority/AssignmentPanel.jsx";
import ResolutionPanel from "../components/authority/ResolutionPanel.jsx";
import Button from "../components/common/Button.jsx";
import {
  LayoutGrid,
  Table as TableIcon,
  Map,
  PlusCircle,
  RotateCcw,
  Sparkles
} from "lucide-react";

export default function Issues() {
  const { role } = useApp();
  const {
    filteredIssues,
    paginatedIssues,
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
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    clearFilters,
    refetch,
    deleteIssue,
    assignDepartment,
    resolveIssue
  } = useIssues();

  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table" | "map"

  // Authority Action Modals
  const [selectedIssueForAction, setSelectedIssueForAction] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleOpenAssign = (issue) => {
    setSelectedIssueForAction(issue);
    setAssignModalOpen(true);
  };

  const handleOpenStatus = (issue) => {
    setSelectedIssueForAction(issue);
    setResolveModalOpen(true);
  };

  const handleOpenDelete = (issue) => {
    setSelectedIssueForAction(issue);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedIssueForAction) return;
    setActionLoading(true);
    await deleteIssue(selectedIssueForAction._id || selectedIssueForAction.id);
    setActionLoading(false);
    setDeleteConfirmOpen(false);
    setSelectedIssueForAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Municipal Complaints Registry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse, search, and track all reported civic infrastructure defects across the city.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Table/List View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "map"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="GIS Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

          <Link to="/report">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Report Issue
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
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
            selectedDepartment !== "All" ||
            searchQuery.trim().length > 0 ||
            sortBy !== "newest"
          }
        />
      </div>

      {/* Main Content Area */}
      {loading ? (
        <LoadingState message="Querying Municipal Registry..." />
      ) : filteredIssues.length === 0 ? (
        <EmptyState
          title="No complaints match your query"
          description="Try broadening your search term or clearing some category/status filters."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      ) : viewMode === "map" ? (
        <div className="space-y-4">
          <IssueMap issues={filteredIssues} />
          <div className="text-xs text-slate-400 text-center">
            Showing {filteredIssues.length} issues pinned on the GIS city grid.
          </div>
        </div>
      ) : viewMode === "table" ? (
        <div className="space-y-4">
          <IssueTable
            issues={paginatedIssues}
            isAuthority={role === "authority"}
            onOpenAssign={handleOpenAssign}
            onOpenStatus={handleOpenStatus}
            onOpenDelete={handleOpenDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredIssues.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedIssues.map((issue) => (
              <IssueCard key={issue._id || issue.id} issue={issue} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredIssues.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* Assignment Modal */}
      <AssignmentPanel
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        issue={selectedIssueForAction}
        onAssign={assignDepartment}
      />

      {/* Resolution Modal */}
      <ResolutionPanel
        isOpen={resolveModalOpen}
        onClose={() => setResolveModalOpen(false)}
        issue={selectedIssueForAction}
        onResolve={resolveIssue}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Complaint from Registry"
        message={`Are you sure you want to permanently delete issue #${selectedIssueForAction?._id || selectedIssueForAction?.id}? This action removes it from municipal dispatch.`}
        confirmText="Delete Issue"
        confirmVariant="danger"
        loading={actionLoading}
      />
    </div>
  );
}
