import React, { useState } from "react";
import { ISSUE_STATUSES } from "../../utils/status.js";
import Button from "../common/Button.jsx";
import { Check, ShieldAlert } from "lucide-react";

export default function IssueStatusControl({
  currentStatus,
  onUpdateStatus,
  loading = false
}) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "Reported");
  const [notes, setNotes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) return;
    await onUpdateStatus(selectedStatus, notes);
    setNotes("");
    setIsOpen(false);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Status Management
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Current: <strong className="text-cyan-400">{currentStatus}</strong>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Cancel" : "Change Status"}
        </Button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-slate-800 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Select New Workflow Status:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ISSUE_STATUSES.map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                    selectedStatus === status
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                      : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Authority Update Log Note (Optional):
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Field inspection completed, work crew dispatched."
              rows={2}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={loading}
              icon={Check}
            >
              Update Status
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
