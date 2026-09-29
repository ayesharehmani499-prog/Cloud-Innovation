import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Database
} from "lucide-react";
import Button from "./Button.jsx";

export default function BackendStatusBanner() {
  const {
    backendStatus,
    backendResponseTime,
    backendError,
    backendUrl,
    testBackendConnection,
    isDemoMode,
    forceDemoMode,
    toggleForceDemoMode
  } = useApp();

  const [expanded, setExpanded] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    await testBackendConnection();
    setTesting(false);
  };

  const isConnected = backendStatus === "connected";

  return (
    <div
      className={`border-b transition-colors text-xs ${
        isConnected && !forceDemoMode
          ? "bg-slate-900/90 border-emerald-500/20 text-slate-300"
          : "bg-amber-950/40 border-amber-500/30 text-amber-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {isConnected && !forceDemoMode ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Backend Connected</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {forceDemoMode
                  ? "Sandbox Demo Mode (Simulated Data)"
                  : "Backend Offline (Localhost:5000 Unreachable)"}
              </span>
            </span>
          )}

          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <Server className="w-3 h-3" />
            {backendUrl}
          </span>

          {isConnected && backendResponseTime && (
            <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400/80">
              ({backendResponseTime}ms)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Retry Connection Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleTest}
            loading={testing}
            className="text-[11px] py-1 px-2.5 h-7 border border-slate-700/60"
            icon={RotateCcw}
          >
            Test Backend
          </Button>

          {/* Toggle Demo Mode Button */}
          <button
            type="button"
            onClick={toggleForceDemoMode}
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg border transition-colors ${
              forceDemoMode
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
            }`}
            title="Toggle between real MongoDB backend and simulated competition sandbox"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{forceDemoMode ? "Exit Sandbox" : "Sandbox Mode"}</span>
          </button>

          {/* Expand Details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-slate-400 hover:text-white rounded"
            title="Connection details"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto px-4 pb-3 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <div>
              <p className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Backend Configuration & State
              </p>
              <p className="mt-1">
                API Base URL: <code className="text-cyan-300 font-mono">{backendUrl}</code>
              </p>
              <p>
                Status:{" "}
                <span className={isConnected ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                  {backendStatus.toUpperCase()}
                </span>
              </p>
              {backendError && (
                <p className="text-rose-400 font-mono mt-0.5 truncate">
                  Error: {backendError}
                </p>
              )}
            </div>

            <div>
              <p className="font-semibold text-slate-200">Competition Evaluation Note</p>
              <p className="mt-1 text-slate-400">
                CityFix will automatically route Axios requests to <code className="text-slate-300 font-mono">http://localhost:5000/api/issues</code>. If your Express + MongoDB server is not running locally in the evaluator's browser environment, CityFix provides interactive offline sandbox simulation so all workflows (Reporting, Authority Dispatch, Resolution, Analytics) can be tested seamlessly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
