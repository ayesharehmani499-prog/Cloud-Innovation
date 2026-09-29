import apiClient, { API_BASE_URL } from "./client.js";
import { MOCK_ISSUES } from "../data/mockIssues.js";

const LOCAL_STORAGE_KEY = "cityfix_issues_store";

// Helper to initialize local issues cache for demo/fallback mode
export function getLocalCachedIssues() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read local issues store", err);
  }
  // Store default mock issues
  saveLocalCachedIssues(MOCK_ISSUES);
  return MOCK_ISSUES;
}

export function saveLocalCachedIssues(issues) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(issues));
  } catch (err) {
    console.warn("Could not save to local issues store", err);
  }
}

// Normalize issue object properties so _id and id are always accessible
export function normalizeIssue(item) {
  if (!item) return null;
  const id = item._id || item.id || `CF-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    ...item,
    _id: id,
    id: id,
    title: item.title || "Untitled Issue",
    category: item.category || "Other",
    description: item.description || "",
    location: item.location || "City Location",
    priority: item.priority || "Medium",
    status: item.status || "Reported",
    assignedDepartment: item.assignedDepartment || "Unassigned",
    assignedAuthority: item.assignedAuthority || null,
    reporterName: item.reporterName || "Anonymous Citizen",
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
    timeline: Array.isArray(item.timeline) && item.timeline.length > 0
      ? item.timeline
      : [
          {
            stage: "Reported",
            timestamp: item.createdAt || new Date().toISOString(),
            actor: item.reporterName || "Citizen",
            note: "Issue lodged in portal."
          }
        ]
  };
}

/**
 * Check if the Express + MongoDB backend is reachable
 */
export async function checkBackendHealth() {
  const startTime = Date.now();
  try {
    const res = await apiClient.get("/issues", {
      timeout: 3000
    });
    return {
      connected: true,
      status: res.status,
      responseTime: Date.now() - startTime,
      url: API_BASE_URL
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message,
      isNetworkError: error.isNetworkError || false,
      url: API_BASE_URL
    };
  }
}

/**
 * Fetch all civic issues from backend API
 */
export async function getIssues() {
  const response = await apiClient.get("/issues");
  let items = [];

  if (response.data && Array.isArray(response.data.data)) {
    items = response.data.data;
  } else if (response.data && Array.isArray(response.data.issues)) {
    items = response.data.issues;
  } else if (Array.isArray(response.data)) {
    items = response.data;
  } else if (response.data && response.data.success && response.data.data) {
    items = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
  }

  return items.map(normalizeIssue);
}

/**
 * Fetch a single issue by ID
 */
export async function getIssueById(id) {
  if (!id) throw new Error("Issue ID is required");
  const response = await apiClient.get(`/issues/${id}`);
  let item = null;

  if (response.data && response.data.data) {
    item = response.data.data;
  } else if (response.data && response.data.issue) {
    item = response.data.issue;
  } else {
    item = response.data;
  }

  return normalizeIssue(item);
}

/**
 * Create a new civic issue
 * Backend expects: { title, category, description, location, priority }
 */
export async function createIssue(data) {
  const payload = {
    title: data.title.trim(),
    category: data.category,
    description: data.description.trim(),
    location: data.location.trim(),
    priority: data.priority || "Medium",
    // Optional supplemental fields
    ...(data.address && { address: data.address.trim() }),
    ...(data.reporterName && { reporterName: data.reporterName.trim() }),
    ...(data.reporterEmail && { reporterEmail: data.reporterEmail.trim() }),
    ...(data.reporterPhone && { reporterPhone: data.reporterPhone.trim() }),
    ...(data.imageUrl && { imageUrl: data.imageUrl }),
    ...(data.coordinates && { coordinates: data.coordinates })
  };

  const response = await apiClient.post("/issues", payload);
  let created = null;

  if (response.data && response.data.data) {
    created = response.data.data;
  } else if (response.data && response.data.issue) {
    created = response.data.issue;
  } else {
    created = response.data;
  }

  return {
    success: true,
    message: (response.data && response.data.message) || "Issue reported successfully",
    data: normalizeIssue(created)
  };
}

/**
 * Update issue fields
 */
export async function updateIssue(id, data) {
  if (!id) throw new Error("Issue ID is required");
  const response = await apiClient.put(`/issues/${id}`, data);
  const updated = response.data?.data || response.data?.issue || response.data;
  return normalizeIssue(updated);
}

/**
 * Update issue status
 */
export async function updateIssueStatus(id, status, notes = "") {
  if (!id) throw new Error("Issue ID is required");
  try {
    // Try PATCH /issues/:id/status
    const response = await apiClient.patch(`/issues/${id}/status`, { status, notes });
    return normalizeIssue(response.data?.data || response.data);
  } catch (err) {
    // If specific route 404s, try generic PUT /issues/:id
    if (err.statusCode === 404 || err.originalError?.response?.status === 404) {
      const response = await apiClient.put(`/issues/${id}`, { status, resolutionNotes: notes });
      return normalizeIssue(response.data?.data || response.data);
    }
    throw err;
  }
}

/**
 * Update issue priority
 */
export async function updateIssuePriority(id, priority) {
  if (!id) throw new Error("Issue ID is required");
  try {
    const response = await apiClient.patch(`/issues/${id}/priority`, { priority });
    return normalizeIssue(response.data?.data || response.data);
  } catch (err) {
    if (err.statusCode === 404 || err.originalError?.response?.status === 404) {
      const response = await apiClient.put(`/issues/${id}`, { priority });
      return normalizeIssue(response.data?.data || response.data);
    }
    throw err;
  }
}

/**
 * Assign issue to department/authority
 */
export async function assignIssue(id, department, authorityName = "") {
  if (!id) throw new Error("Issue ID is required");
  try {
    const response = await apiClient.patch(`/issues/${id}/assign`, {
      assignedDepartment: department,
      assignedAuthority: authorityName
    });
    return normalizeIssue(response.data?.data || response.data);
  } catch (err) {
    if (err.statusCode === 404 || err.originalError?.response?.status === 404) {
      const response = await apiClient.put(`/issues/${id}`, {
        assignedDepartment: department,
        assignedAuthority: authorityName
      });
      return normalizeIssue(response.data?.data || response.data);
    }
    throw err;
  }
}

/**
 * Mark issue as resolved with resolution notes
 */
export async function addResolution(id, { notes, department, resolvedBy }) {
  if (!id) throw new Error("Issue ID is required");
  try {
    const response = await apiClient.patch(`/issues/${id}/resolve`, {
      status: "Resolved",
      resolutionNotes: notes,
      assignedDepartment: department,
      resolvedBy
    });
    return normalizeIssue(response.data?.data || response.data);
  } catch (err) {
    if (err.statusCode === 404 || err.originalError?.response?.status === 404) {
      const response = await apiClient.put(`/issues/${id}`, {
        status: "Resolved",
        resolutionNotes: notes,
        ...(department && { assignedDepartment: department })
      });
      return normalizeIssue(response.data?.data || response.data);
    }
    throw err;
  }
}

/**
 * Delete issue
 */
export async function deleteIssue(id) {
  if (!id) throw new Error("Issue ID is required");
  const response = await apiClient.delete(`/issues/${id}`);
  return response.data;
}
