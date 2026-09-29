import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ReportIssue from "./pages/ReportIssue.jsx";
import Issues from "./pages/Issues.jsx";
import IssueDetails from "./pages/IssueDetails.jsx";
import MyReports from "./pages/MyReports.jsx";
import AuthorityDashboard from "./pages/AuthorityDashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/issues/:id" element={<IssueDetails />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/authority" element={<AuthorityDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
