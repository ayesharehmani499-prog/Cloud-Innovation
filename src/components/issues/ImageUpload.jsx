import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from "lucide-react";

export default function ImageUpload({ value, onChange, onRemove, error }) {
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setFileError("Only JPG, PNG, and WebP images are supported.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Image size must be less than 5MB.");
      return;
    }

    // Read as Data URL for immediate preview and fallback transmission
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      onChange({
        file,
        previewUrl: uploadEvent.target?.result,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileError("");
    if (onRemove) onRemove();
  };

  const preview = typeof value === "string" ? value : value?.previewUrl;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        Evidence / Site Photo (Optional)
      </label>

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group">
          <img
            src={preview}
            alt="Complaint Site Evidence"
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-200 font-mono flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                {value?.name || "Image Attached"}
              </span>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-rose-600/90 text-white hover:bg-rose-500 shadow-md transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center bg-slate-900/40 hover:bg-slate-900/80 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex items-center justify-center mb-3 border border-slate-700">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
              Click to upload photo evidence
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Supports JPG, PNG, WebP up to 5MB
            </p>
          </div>
        </div>
      )}

      {(fileError || error) && (
        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{fileError || error}</span>
        </p>
      )}
    </div>
  );
}
