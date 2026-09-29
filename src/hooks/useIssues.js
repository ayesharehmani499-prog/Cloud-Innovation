import { useState, useEffect, useMemo, useCallback } from "react";
import {
  getIssues,
  createIssue,
  updateIssueStatus,
  updateIssuePriority,
  assignIssue,
  addResolution,
  deleteIssue,
  getLocalCachedIssues,
  saveLocalCachedIssues,
  normalizeIssue
} from "../api/issues.js";
import { computeDashboardStats } from "../api/dashboard.js";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "./useToast.js";

export function useIssues() {
  const { isDemoMode, refreshTrigger, triggerRefresh, testBackendConnection } = useApp();
  const toast = useToast();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromBackend, setIsFromBackend] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest", "priority", "status"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Load issues
  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);

    // If demo mode forced or requested
    if (isDemoMode) {
      const local = getLocalCachedIssues();
      setIssues(local.map(normalizeIssue));
      setIsFromBackend(false);
      setLoading(false);
      return;
    }

    try {
      const remoteIssues = await getIssues();
      setIssues(remoteIssues);
      setIsFromBackend(true);
      // Also sync local cache with remote data for resilience
      saveLocalCachedIssues(remoteIssues);
    } catch (err) {
      console.warn("Backend fetch failed, falling back to cached/demo issues", err);
      setError(err.message || "Failed to load issues from backend");
      const fallback = getLocalCachedIssues();
      setIssues(fallback.map(normalizeIssue));
      setIsFromBackend(false);
    } finally {
      setLoading(false);
    }
  }, [isDemoMode]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues, refreshTrigger]);

  // Priority ranking for sorting
  const priorityRank = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1
  };

  // Filtered & sorted issues
  const filteredIssues = useMemo(() => {
    let result = [...issues];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          (i.title && i.title.toLowerCase().includes(q)) ||
          (i._id && i._id.toLowerCase().includes(q)) ||
          (i.id && i.id.toLowerCase().includes(q)) ||
          (i.location && i.location.toLowerCase().includes(q)) ||
          (i.category && i.category.toLowerCase().includes(q)) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((i) => i.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus && selectedStatus !== "All") {
      result = result.filter((i) => i.status === selectedStatus);
    }

    // Priority filter
    if (selectedPriority && selectedPriority !== "All") {
      result = result.filter((i) => i.priority === selectedPriority);
    }

    // Department filter
    if (selectedDepartment && selectedDepartment !== "All") {
      result = result.filter((i) => i.assignedDepartment === selectedDepartment);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (sortBy === "priority") {
        return (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0);
      }
      if (sortBy === "status") {
        return (a.status || "").localeCompare(b.status || "");
      }
      return 0;
    });

    return result;
  }, [
    issues,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedPriority,
    selectedDepartment,
    sortBy
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage) || 1;
  const paginatedIssues = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIssues.slice(start, start + itemsPerPage);
  }, [filteredIssues, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, selectedPriority, selectedDepartment, sortBy]);

  // Computed dashboard statistics
  const stats = useMemo(() => {
    return computeDashboardStats(issues);
  }, [issues]);

  // Mutations
  const handleCreateIssue = async (formData) => {
    if (!isDemoMode && isFromBackend) {
      try {
        const response = await createIssue(formData);
        toast.success("Civic complaint registered successfully with municipal system!");
        triggerRefresh();
        return response.data;
      } catch (err) {
        toast.error(`Backend failed: ${err.message}`);
        throw err;
      }
    } else {
      // In offline/demo sandbox
      const newIssue = normalizeIssue({
        _id: `CF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        status: "Reported",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDemo: true,
        timeline: [
          {
            stage: "Reported",
            timestamp: new Date().toISOString(),
            actor: formData.reporterName || "Citizen",
            note: "Complaint submitted via portal."
          }
        ]
      });

      const updatedList = [newIssue, ...issues];
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success(
        "Issue reported successfully! (Sandbox/Offline mode active)"
      );
      triggerRefresh();
      return newIssue;
    }
  };

  const handleUpdateStatus = async (id, newStatus, notes = "") => {
    if (!isDemoMode && isFromBackend) {
      try {
        const updated = await updateIssueStatus(id, newStatus, notes);
        toast.success(`Status updated to "${newStatus}"`);
        triggerRefresh();
        return updated;
      } catch (err) {
        toast.error(`Status update failed: ${err.message}`);
        throw err;
      }
    } else {
      // Local demo mode
      const updatedList = issues.map((i) => {
        if (i._id === id || i.id === id) {
          const currentTimeline = Array.isArray(i.timeline) ? [...i.timeline] : [];
          currentTimeline.push({
            stage: newStatus,
            timestamp: new Date().toISOString(),
            actor: "Municipal Authority",
            note: notes || `Status changed to ${newStatus}`
          });
          return {
            ...i,
            status: newStatus,
            resolutionNotes: newStatus === "Resolved" ? (notes || i.resolutionNotes) : i.resolutionNotes,
            updatedAt: new Date().toISOString(),
            timeline: currentTimeline
          };
        }
        return i;
      });
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success(`Status updated to "${newStatus}" (Offline demo)`);
      triggerRefresh();
      return updatedList.find((i) => i._id === id || i.id === id);
    }
  };

  const handleUpdatePriority = async (id, newPriority) => {
    if (!isDemoMode && isFromBackend) {
      try {
        const updated = await updateIssuePriority(id, newPriority);
        toast.success(`Priority updated to "${newPriority}"`);
        triggerRefresh();
        return updated;
      } catch (err) {
        toast.error(`Priority update failed: ${err.message}`);
        throw err;
      }
    } else {
      const updatedList = issues.map((i) =>
        i._id === id || i.id === id
          ? { ...i, priority: newPriority, updatedAt: new Date().toISOString() }
          : i
      );
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success(`Priority updated to "${newPriority}" (Offline demo)`);
      triggerRefresh();
    }
  };

  const handleAssignDepartment = async (id, department, authorityName = "") => {
    if (!isDemoMode && isFromBackend) {
      try {
        const updated = await assignIssue(id, department, authorityName);
        toast.success(`Assigned to ${department}`);
        triggerRefresh();
        return updated;
      } catch (err) {
        toast.error(`Assignment failed: ${err.message}`);
        throw err;
      }
    } else {
      const updatedList = issues.map((i) => {
        if (i._id === id || i.id === id) {
          const currentTimeline = Array.isArray(i.timeline) ? [...i.timeline] : [];
          currentTimeline.push({
            stage: "Under Review",
            timestamp: new Date().toISOString(),
            actor: "Assignment Desk",
            note: `Dispatched to ${department} department.`
          });
          return {
            ...i,
            assignedDepartment: department,
            assignedAuthority: authorityName || i.assignedAuthority,
            status: i.status === "Reported" ? "Under Review" : i.status,
            updatedAt: new Date().toISOString(),
            timeline: currentTimeline
          };
        }
        return i;
      });
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success(`Assigned to ${department} (Offline demo)`);
      triggerRefresh();
    }
  };

  const handleResolveIssue = async (id, { notes, department, resolvedBy }) => {
    if (!isDemoMode && isFromBackend) {
      try {
        const updated = await addResolution(id, { notes, department, resolvedBy });
        toast.success("Issue marked as resolved!");
        triggerRefresh();
        return updated;
      } catch (err) {
        toast.error(`Resolution failed: ${err.message}`);
        throw err;
      }
    } else {
      const updatedList = issues.map((i) => {
        if (i._id === id || i.id === id) {
          const currentTimeline = Array.isArray(i.timeline) ? [...i.timeline] : [];
          currentTimeline.push({
            stage: "Resolved",
            timestamp: new Date().toISOString(),
            actor: resolvedBy || "Municipal Inspector",
            note: notes || "Remedial work confirmed and completed."
          });
          return {
            ...i,
            status: "Resolved",
            resolutionNotes: notes,
            assignedDepartment: department || i.assignedDepartment,
            updatedAt: new Date().toISOString(),
            timeline: currentTimeline
          };
        }
        return i;
      });
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success("Issue marked as resolved! (Offline demo)");
      triggerRefresh();
    }
  };

  const handleDeleteIssue = async (id) => {
    if (!isDemoMode && isFromBackend) {
      try {
        await deleteIssue(id);
        toast.success("Issue deleted from system");
        triggerRefresh();
      } catch (err) {
        toast.error(`Deletion failed: ${err.message}`);
        throw err;
      }
    } else {
      const updatedList = issues.filter((i) => i._id !== id && i.id !== id);
      setIssues(updatedList);
      saveLocalCachedIssues(updatedList);
      toast.success("Issue deleted (Offline demo)");
      triggerRefresh();
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedPriority("All");
    setSelectedDepartment("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  return {
    issues,
    filteredIssues,
    paginatedIssues,
    loading,
    error,
    isFromBackend,
    stats,
    // Filters & pagination state
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
    setItemsPerPage,
    clearFilters,
    // Actions
    refetch: fetchIssues,
    createIssue: handleCreateIssue,
    updateStatus: handleUpdateStatus,
    updatePriority: handleUpdatePriority,
    assignDepartment: handleAssignDepartment,
    resolveIssue: handleResolveIssue,
    deleteIssue: handleDeleteIssue
  };
}
