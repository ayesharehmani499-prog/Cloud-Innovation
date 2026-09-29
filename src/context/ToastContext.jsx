import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast = {
      id,
      type: toast.type || "info", // "success" | "error" | "warning" | "info"
      title: toast.title || "",
      message: typeof toast === "string" ? toast : toast.message,
      duration: toast.duration || 4500
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message, title = "Success") => {
    return addToast({ type: "success", title, message });
  }, [addToast]);

  const error = useCallback((message, title = "Error") => {
    return addToast({ type: "error", title, message, duration: 6000 });
  }, [addToast]);

  const warning = useCallback((message, title = "Warning") => {
    return addToast({ type: "warning", title, message, duration: 5000 });
  }, [addToast]);

  const info = useCallback((message, title = "Information") => {
    return addToast({ type: "info", title, message });
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
