import React from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  confirmVariant = "danger",
  loading = false
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
      showClose={!loading}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button
          variant="secondary"
          size="sm"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          size="sm"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
