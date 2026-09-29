import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DEMO_USERS } from "../api/users.js";
import { API_BASE_URL } from "../api/client.js";
import { checkBackendHealth } from "../api/issues.js";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications
} from "../api/notifications.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Role: "citizen" | "authority"
  const [role, setRole] = useState(() => {
    return localStorage.getItem("cityfix_role") || "citizen";
  });

  // Backend state
  const [backendStatus, setBackendStatus] = useState("checking"); // "connected" | "disconnected" | "checking"
  const [backendResponseTime, setBackendResponseTime] = useState(null);
  const [backendError, setBackendError] = useState(null);
  const [forceDemoMode, setForceDemoMode] = useState(() => {
    return localStorage.getItem("cityfix_force_demo") === "true";
  });

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  // Global refresh counter
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const changeRole = useCallback((newRole) => {
    setRole(newRole);
    localStorage.setItem("cityfix_role", newRole);
  }, []);

  // Connection tester
  const testBackendConnection = useCallback(async () => {
    setBackendStatus("checking");
    const health = await checkBackendHealth();
    if (health.connected) {
      setBackendStatus("connected");
      setBackendResponseTime(health.responseTime);
      setBackendError(null);
    } else {
      setBackendStatus("disconnected");
      setBackendResponseTime(null);
      setBackendError(health.error);
    }
    return health;
  }, []);

  // Initial check on mount
  useEffect(() => {
    testBackendConnection();
  }, [testBackendConnection]);

  // Load notifications
  useEffect(() => {
    async function loadNotifs() {
      const notifs = await getNotifications();
      setNotifications(notifs);
      setUnreadNotifCount(notifs.filter((n) => !n.read).length);
    }
    loadNotifs();
  }, [refreshTrigger]);

  const handleMarkNotifRead = async (id) => {
    const updated = await markNotificationRead(id);
    setNotifications(updated);
    setUnreadNotifCount(updated.filter((n) => !n.read).length);
  };

  const handleMarkAllNotifsRead = async () => {
    const updated = await markAllNotificationsRead();
    setNotifications(updated);
    setUnreadNotifCount(0);
  };

  const handleClearNotifs = async () => {
    const updated = await clearAllNotifications();
    setNotifications(updated);
    setUnreadNotifCount(0);
  };

  const toggleForceDemoMode = () => {
    setForceDemoMode((prev) => {
      const next = !prev;
      localStorage.setItem("cityfix_force_demo", String(next));
      return next;
    });
    triggerRefresh();
  };

  // Determine if application should operate in offline/demo mode
  const isOperatingInDemoMode = forceDemoMode || backendStatus === "disconnected";

  const currentUser = DEMO_USERS[role] || DEMO_USERS.citizen;

  return (
    <AppContext.Provider
      value={{
        role,
        changeRole,
        currentUser,
        backendStatus,
        backendResponseTime,
        backendError,
        backendUrl: API_BASE_URL,
        testBackendConnection,
        isDemoMode: isOperatingInDemoMode,
        forceDemoMode,
        toggleForceDemoMode,
        notifications,
        unreadNotifCount,
        markNotificationRead: handleMarkNotifRead,
        markAllNotificationsRead: handleMarkAllNotifsRead,
        clearAllNotifications: handleClearNotifs,
        refreshTrigger,
        triggerRefresh
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
