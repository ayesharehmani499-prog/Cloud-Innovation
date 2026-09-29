import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo.jsx";
import { useApp } from "../../context/AppContext.jsx";
import {
  LayoutDashboard,
  PlusCircle,
  ListFilter,
  FileText,
  ShieldCheck,
  BarChart3,
  Bell,
  Settings,
  Info,
  UserCheck,
  ChevronRight
} from "lucide-react";

export default function Sidebar({ onCloseMobile }) {
  const { role, changeRole, currentUser, unreadNotifCount, isDemoMode } = useApp();

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: "/report",
      label: "Report Issue",
      icon: PlusCircle,
      badge: "New",
      highlight: true
    },
    {
      to: "/issues",
      label: "All Issues",
      icon: ListFilter,
      badge: null
    },
    {
      to: "/my-reports",
      label: "My Reports",
      icon: FileText,
      badge: null
    },
    {
      to: "/authority",
      label: "Authority Portal",
      icon: ShieldCheck,
      badge: "Admin",
      authorityOnly: false
    },
    {
      to: "/analytics",
      label: "Analytics & Trends",
      icon: BarChart3,
      badge: null
    },
    {
      to: "/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : null,
      badgeColor: "bg-rose-500 text-white"
    },
    {
      to: "/settings",
      label: "Settings",
      icon: Settings,
      badge: null
    },
    {
      to: "/about",
      label: "About CityFix",
      icon: Info,
      badge: null
    }
  ];

  return (
    <aside className="w-64 flex flex-col h-full bg-slate-950 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <Logo size="md" showTagline={true} />
      </div>

      {/* Role Switcher Pill */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/30">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Active Role</span>
          <span className="text-[10px] text-cyan-400 font-mono">Demo Mode</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => changeRole("citizen")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              role === "citizen"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>Citizen</span>
          </button>
          <button
            type="button"
            onClick={() => changeRole("authority")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              role === "authority"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authority</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                } ${item.highlight ? "text-cyan-400 font-semibold" : ""}`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    item.highlight ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor ||
                    "bg-cyan-950 text-cyan-400 border border-cyan-700/50"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {currentUser.designation || currentUser.city}
            </p>
          </div>
          <span
            className={`w-2 h-2 rounded-full ${
              role === "authority" ? "bg-blue-400" : "bg-emerald-400"
            }`}
            title={`Active: ${role}`}
          />
        </div>
      </div>
    </aside>
  );
}
