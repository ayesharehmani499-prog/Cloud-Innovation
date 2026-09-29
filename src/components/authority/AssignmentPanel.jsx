import React, { useState } from "react";
import DepartmentSelect from "./DepartmentSelect.jsx";
import Button from "../common/Button.jsx";
import Modal from "../common/Modal.jsx";
import { Building2, UserCheck } from "lucide-react";

export default function AssignmentPanel({
  isOpen,
  onClose,
  issue,
  onAssign,
  loading = false
}) {
  const [department, setDepartment] = useState(
    issue?.assignedDepartment && issue.assignedDepartment !== "Unassigned"
      ? issue.assignedDepartment
      : "Public Works"
  );
  const [authorityName, setAuthorityName] = useState(
    issue?.assignedAuthority || "Er. Alok Verma (Lead Engineer)"
  );

  if (!issue) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department) return;
    await onAssign(issue._id || issue.id, department, authorityName);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Department Assignment & Work Order"
      subtitle={`Issue #${issue._id || issue.id}: ${issue.title}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Target Municipal Department <span className="text-rose-400">*</span>
          </label>
          <DepartmentSelect
            value={department}
            onChange={setDepartment}
            label=""
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Lead Responsible Officer / Inspector
          </label>
          <input
            type="text"
            value={authorityName}
            onChange={(e) => setAuthorityName(e.target.value)}
            placeholder="e.g. Er. Rajesh Jha (Zonal In-Charge)"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-200">Assignment Effect:</p>
          <p>
            Assigning will transition status from "Reported" to "Under Review" / "In Progress" and generate a municipal work dispatch notice.
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
            variant="primary"
            size="sm"
            icon={UserCheck}
            loading={loading}
            disabled={!department}
          >
            Confirm Assignment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
