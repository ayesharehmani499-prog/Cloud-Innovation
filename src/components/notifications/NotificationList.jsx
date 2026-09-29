import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatDate.js";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Check,
  Trash2,
  ExternalLink
} from "lucide-react";
import Button from "../common/Button.jsx";

export default function NotificationList({
  notifications = [],
  onMarkRead,
  onMarkAllRead,
  onClearAll
}) {
  const getIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case "resolved":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "status":
        return <Clock className="w-4 h-4 text-cyan-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Notifications Center
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {unreadCount} Unread
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && onMarkAllRead && (
            <Button
              variant="outline"
              size="sm"
              icon={Check}
              onClick={onMarkAllRead}
            >
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && onClearAll && (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={onClearAll}
              className="text-slate-400 hover:text-rose-400"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* List items */}
      {notifications.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <Bell className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No notifications</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You're all caught up! New updates regarding reported complaints and municipal dispatches will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                notif.read
                  ? "bg-slate-900/60 border-slate-800/80 opacity-80"
                  : "bg-slate-900 border-cyan-500/30 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/20"
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold tracking-tight ${
                      notif.read ? "text-slate-300" : "text-white"
                    }`}
                  >
                    {notif.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                    {formatTimeAgo(notif.timestamp)}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  {notif.issueId ? (
                    <Link
                      to={`/issues/${notif.issueId}`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Inspect Issue #{notif.issueId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ) : <span />}

                  {!notif.read && onMarkRead && (
                    <button
                      type="button"
                      onClick={() => onMarkRead(notif.id)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Read</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
