import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "../hooks/useToast.js";
import Button from "../components/common/Button.jsx";
import {
  User,
  Bell,
  Palette,
  Server,
  Save,
  CheckCircle2,
  Shield,
  Sparkles,
  RotateCcw
} from "lucide-react";

export default function Settings() {
  const {
    role,
    changeRole,
    currentUser,
    backendUrl,
    backendStatus,
    testBackendConnection,
    forceDemoMode,
    toggleForceDemoMode
  } = useApp();
  const toast = useToast();

  const [notificationsEnabled, setNotificationsEnabled] = useState({
    statusUpdates: true,
    resolutionUpdates: true,
    criticalAlerts: true,
    authorityDispatches: true
  });

  const [testing, setTesting] = useState(false);

  const handleTogglePref = (key) => {
    setNotificationsEnabled((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.info("Notification preferences saved.");
  };

  const handleTestBackend = async () => {
    setTesting(true);
    const health = await testBackendConnection();
    setTesting(false);
    if (health.connected) {
      toast.success(`Successfully connected to ${backendUrl} (${health.responseTime}ms)`);
    } else {
      toast.warning(`Could not reach backend at ${backendUrl}. Sandbox mode active.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Portal Preferences & Configuration
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your role assignment, alerting preferences, and municipal backend sync.
        </p>
      </div>

      {/* Role & Profile Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Identity & Role Assignment
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500/40"
            />
            <div>
              <h4 className="text-base font-bold text-white">{currentUser.name}</h4>
              <p className="text-xs text-slate-400">{currentUser.email}</p>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">
                {currentUser.designation || currentUser.ward || "Smart City Citizen"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeRole("citizen")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                role === "citizen"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Citizen Role
            </button>
            <button
              type="button"
              onClick={() => changeRole("authority")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                role === "authority"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Authority Role
            </button>
          </div>
        </div>
      </div>

      {/* Backend API Configuration & Sandbox */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Server className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Backend Connectivity & Database
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-300 block">
                Target Express API Base URL:
              </span>
              <code className="text-xs font-mono text-cyan-400">
                {backendUrl}
              </code>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={RotateCcw}
                loading={testing}
                onClick={handleTestBackend}
              >
                Test Endpoint
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-300 block">
                Competition Sandbox Simulation Mode:
              </span>
              <span className="text-[11px] text-slate-400">
                Allows testing full CRUD workflows with realistic civic complaints even if local MongoDB is offline.
              </span>
            </div>

            <button
              type="button"
              onClick={toggleForceDemoMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                forceDemoMode
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {forceDemoMode ? "Sandbox Enabled" : "Sandbox Disabled"}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Notification Alert Preferences
          </h3>
        </div>

        <div className="space-y-3">
          {[
            { key: "statusUpdates", title: "Status Transition Alerts", desc: "Notify when complaint changes from Reported to In Progress or Under Review." },
            { key: "resolutionUpdates", title: "Resolution & Sign-off Notices", desc: "Immediate alert when field team marks defect resolved." },
            { key: "criticalAlerts", title: "Critical Emergency Broadcasts", desc: "Urgent notifications for burst pipelines, structural failures, or power hazards." },
            { key: "authorityDispatches", title: "Municipal Dispatch Notes", desc: "Work order notes and assignment details from department engineers." }
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
            >
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-400">
                  {item.desc}
                </span>
              </div>

              <input
                type="checkbox"
                checked={notificationsEnabled[item.key]}
                onChange={() => handleTogglePref(item.key)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
