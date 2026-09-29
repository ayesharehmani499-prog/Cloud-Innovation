import React, { useState } from "react";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import DepartmentSelect from "./DepartmentSelect.jsx";
import { CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export default function ResolutionPanel({
  isOpen,
  onClose,
  issue,
  onResolve,
  loading = false
}) {
  const [notes, setNotes] = useState(
    issue?.resolutionNotes ||
      "Remedial engineering works completed and quality inspection confirmed."
  );
  const [department, setDepartment] = useState(
    issue?.assignedDepartment && issue.assignedDepartment !== "Unassigned"
      ? issue.assignedDepartment
      : "Public Works"
  );
  const [resolvedBy, setResolvedBy] = useState(
    "Er. Alok Verma (Zonal Chief Engineer)"
  );
  const [confirmPrompt, setConfirmPrompt] = useState(false);

  if (!issue) return null;

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    setConfirmPrompt(true);
  };

  const handleFinalConfirm = async () => {
    await onResolve(issue._id || issue.id, {
      notes,
      department,
      resolvedBy
    });
    setConfirmPrompt(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setConfirmPrompt(false);
        onClose();
      }}
      title="Municipal Sign-off & Issue Resolution"
      subtitle={`Complaint #${issue._id || issue.id}: ${issue.title}`}
    >
      {!confirmPrompt ? (
        <form onSubmit={handleInitialSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Official Resolution Notes <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail the remedial measures executed, e.g. 'Streetlight ballast replaced with new 90W LED fitting and tested operational.'"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Executing Department
              </label>
              <DepartmentSelect
                value={department}
                onChange={setDepartment}
                label=""
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Certifying Officer
              </label>
              <input
                type="text"
                value={resolvedBy}
                onChange={(e) => setResolvedBy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Submitting will permanently transition this complaint into <strong>Resolved</strong> status, trigger citizen notification, and elevate the city resolution rate index.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              size="sm"
              icon={ShieldCheck}
              disabled={!notes.trim()}
            >
              Proceed to Sign Off
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">
                Mark this issue as resolved?
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Confirming will close the work order and notify citizen <strong>{issue.reporterName || "the reporter"}</strong> that remedial action has concluded.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setConfirmPrompt(false)}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="success"
              size="sm"
              icon={CheckCircle2}
              onClick={handleFinalConfirm}
              loading={loading}
            >
              Yes, Mark Resolved
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
