import apiClient from "./client.js";

/**
 * Compute statistics given a list of issues
 */
export function computeDashboardStats(issues = []) {
  const totalIssues = issues.length;
  const reportedIssues = issues.filter((i) => i.status === "Reported").length;
  const underReviewIssues = issues.filter((i) => i.status === "Under Review").length;
  const inProgressIssues = issues.filter((i) => i.status === "In Progress").length;
  const resolvedIssues = issues.filter((i) => i.status === "Resolved").length;
  const rejectedIssues = issues.filter((i) => i.status === "Rejected").length;

  const criticalIssues = issues.filter((i) => i.priority === "Critical").length;
  const highPriorityIssues = issues.filter((i) => i.priority === "High").length;
  const mediumPriorityIssues = issues.filter((i) => i.priority === "Medium").length;
  const lowPriorityIssues = issues.filter((i) => i.priority === "Low").length;

  const resolutionRate =
    totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  // Category breakdown
  const categoryCounts = {};
  issues.forEach((i) => {
    const cat = i.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  // Department breakdown
  const departmentCounts = {};
  issues.forEach((i) => {
    const dept = i.assignedDepartment || "Unassigned";
    departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
  });

  return {
    totalIssues,
    reportedIssues,
    underReviewIssues,
    inProgressIssues,
    resolvedIssues,
    rejectedIssues,
    criticalIssues,
    highPriorityIssues,
    mediumPriorityIssues,
    lowPriorityIssues,
    resolutionRate,
    categoryCounts,
    departmentCounts
  };
}

/**
 * Fetch dashboard statistics from backend or fall back to computed stats
 */
export async function getDashboardStats(fallbackIssues = []) {
  try {
    const response = await apiClient.get("/dashboard/stats");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return computeDashboardStats(fallbackIssues);
  } catch {
    // If backend doesn't implement /dashboard/stats yet, compute from issue dataset
    return computeDashboardStats(fallbackIssues);
  }
}
