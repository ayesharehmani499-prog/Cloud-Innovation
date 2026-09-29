import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";
import {
  Menu,
  Bell,
  Plus,
  Shield,
  User,
  Search,
  ExternalLink,
  Sparkles
} from "lucide-react";
import Button from "../common/Button.jsx";

export default function Topbar({ onOpenMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, changeRole, unreadNotifCount, currentUser, forceDemoMode } = useApp();

  const getPageTitle = (path) => {
    if (path === "/" || path === "/dashboard") return "Citizen Portal Dashboard";
    if (path === "/report") return "Report Civic Complaint";
    if (path.startsWith("/issues/") && path !== "/issues") return "Issue Inspection & Details";
    if (path === "/issues") return "Municipal Complaints Registry";
    if (path === "/my-reports") return "My Lodged Complaints";
    if (path === "/authority") return "Authority Operations & Triage";
    if (path === "/analytics") return "City Governance Analytics";
    if (path === "/notifications") return "Notifications & Alerts";
    if (path === "/settings") return "Portal Settings";
    if (path === "/about") return "About CityFix Civic Tech";
    return "CityFix Portal";
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>{getPageTitle(location.pathname)}</span>
            {forceDemoMode && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                Sandbox Active
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Report CTA */}
        {location.pathname !== "/report" && (
          <Link to="/report" className="hidden sm:inline-block">
            <Button variant="primary" size="sm" icon={Plus}>
              Report Issue
            </Button>
          </Link>
        )}

        {/* Role Pill Switcher */}
        <div
          onClick={() => changeRole(role === "citizen" ? "authority" : "citizen")}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 cursor-pointer transition-colors select-none text-xs"
          title="Click to toggle between Citizen & Authority mode"
        >
          {role === "authority" ? (
            <Shield className="w-3.5 h-3.5 text-blue-400" />
          ) : (
            <User className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span className="text-slate-300">
            Role:{" "}
            <strong className="text-white capitalize">{role}</strong>
          </span>
          <span className="text-[10px] text-cyan-400 underline font-mono">
            switch
          </span>
        </div>

        {/* Notifications Icon */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white">
              {unreadNotifCount > 9 ? "9+" : unreadNotifCount}
            </span>
          )}
        </Link>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
          />
        </div>
      </div>
    </header>
  );
}
