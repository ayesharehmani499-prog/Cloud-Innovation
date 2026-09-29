import apiClient from "./client.js";
import { MOCK_NOTIFICATIONS } from "../data/mockNotifications.js";

const NOTIF_STORAGE_KEY = "cityfix_notifications";

export function getLocalNotifications() {
  try {
    const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading local notifications", err);
  }
  return MOCK_NOTIFICATIONS;
}

export function saveLocalNotifications(notifications) {
  try {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
  } catch (err) {
    console.warn("Error saving local notifications", err);
  }
}

export async function getNotifications() {
  try {
    const response = await apiClient.get("/notifications");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return getLocalNotifications();
  } catch {
    return getLocalNotifications();
  }
}

export async function markNotificationRead(id) {
  try {
    await apiClient.patch(`/notifications/${id}/read`);
  } catch {
    // local fallback
  }
  const notifs = getLocalNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  saveLocalNotifications(notifs);
  return notifs;
}

export async function markAllNotificationsRead() {
  try {
    await apiClient.post("/notifications/read-all");
  } catch {
    // local fallback
  }
  const notifs = getLocalNotifications().map((n) => ({ ...n, read: true }));
  saveLocalNotifications(notifs);
  return notifs;
}

export async function clearAllNotifications() {
  try {
    await apiClient.delete("/notifications");
  } catch {
    // local fallback
  }
  saveLocalNotifications([]);
  return [];
}
