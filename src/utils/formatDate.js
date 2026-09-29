export function formatDate(dateInput) {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  } catch {
    return String(dateInput);
  }
}

export function formatTimeAgo(dateInput) {
  if (!dateInput) return "Just now";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return formatDate(dateInput);
  } catch {
    return "Recently";
  }
}

export function formatShortDate(dateInput) {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric"
    }).format(date);
  } catch {
    return String(dateInput);
  }
}
