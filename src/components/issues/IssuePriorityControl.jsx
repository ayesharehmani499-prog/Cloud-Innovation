import React, { useState } from "react";
import { ISSUE_PRIORITIES, PRIORITY_CONFIG } from "../../utils/status.js";
import Button from "../common/Button.jsx";
import { ShieldAlert, Check } from "lucide-react";

export default function IssuePriorityControl({
  currentPriority,
  onUpdatePriority,
  loading = false
}) {
  const [selectedPriority, setSelectedPriority] = useState(currentPriority || "Medium");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPriority) return;
    await onUpdatePriority(selectedPriority);
    setIsOpen(false);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Priority Level
          </span>
          <span className="text-xs text-slate-300 font-medium">
            Current: <strong className="text-white">{currentPriority}</strong>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Cancel" : "Change Priority"}
        </Button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-slate-800 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ISSUE_PRIORITIES.map((priority) => {
              const cfg = PRIORITY_CONFIG[priority];
              return (
                <button
                  type="button"
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    selectedPriority === priority
                      ? `${cfg.badge} ring-2 ring-cyan-500`
                      : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  <span>{priority}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={loading}
              icon={Check}
            >
              Save Priority
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
