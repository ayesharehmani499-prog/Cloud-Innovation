import React from "react";
import { useApp } from "../context/AppContext.jsx";
import NotificationList from "../components/notifications/NotificationList.jsx";

export default function Notifications() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <NotificationList
        notifications={notifications}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllNotificationsRead}
        onClearAll={clearAllNotifications}
      />
    </div>
  );
}
