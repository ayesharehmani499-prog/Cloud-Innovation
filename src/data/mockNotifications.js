export const MOCK_NOTIFICATIONS = [
  {
    id: "notif-1",
    issueId: "CF-2026-003",
    title: "Critical Issue Alert",
    message: "Water Leakage at Station Road marked as Critical Priority by Zonal Officer.",
    type: "critical",
    read: false,
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: "notif-2",
    issueId: "CF-2026-002",
    title: "Status Updated to In Progress",
    message: "Road Pothole at Gandhi Chowk has been assigned to Roads & Transport Department.",
    type: "status",
    read: false,
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: "notif-3",
    issueId: "CF-2026-004",
    title: "Issue Successfully Resolved",
    message: "Overflowing Waste Bin at Market Area has been resolved by Sanitation Inspector Sunil Das.",
    type: "resolved",
    read: true,
    timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: "notif-4",
    issueId: "CF-2026-001",
    title: "New Report Awaiting Review",
    message: "Broken Streetlight reported by Rajesh Kumar at Patna Main Road.",
    type: "new",
    read: true,
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
];
