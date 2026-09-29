import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ISSUE_CATEGORIES,
  ISSUE_PRIORITIES,
  PRIORITY_CONFIG
} from "../../utils/status.js";
import { validateIssueForm } from "../../utils/validation.js";
import ImageUpload from "./ImageUpload.jsx";
import Button from "../common/Button.jsx";
import { useToast } from "../../hooks/useToast.js";
import { useApp } from "../../context/AppContext.jsx";
import {
  MapPin,
  LocateFixed,
  Send,
  AlertCircle,
  CheckCircle2,
  FileText,
  User,
  Phone,
  Mail,
  Compass
} from "lucide-react";

export default function IssueForm({ onSubmit, loading = false }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useApp();

  const [formData, setFormData] = useState({
    title: "",
    category: "Pothole",
    description: "",
    location: "",
    address: "",
    priority: "Medium",
    latitude: "",
    longitude: "",
    reporterName: currentUser?.name || "Rajesh Kumar",
    reporterEmail: currentUser?.email || "rajesh.k@example.com",
    reporterPhone: currentUser?.phone || "+91 98765 43210",
    image: null
  });

  const [errors, setErrors] = useState({});
  const [locating, setLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Browser Geolocation
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.warning("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setLocationSuccess(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          location: prev.location || `GPS (${lat}, ${lng})`,
          address: prev.address || `Geo-coordinates Lat: ${lat}, Long: ${lng}`
        }));
        setLocating(false);
        setLocationSuccess(true);
        toast.success("Device GPS coordinates captured!");
      },
      (error) => {
        console.warn("Geolocation error", error);
        setLocating(false);
        toast.warning(
          "Could not retrieve GPS location automatically. Please enter location name manually."
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateIssueForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form before submitting.");
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      address: formData.address || formData.location,
      reporterName: formData.reporterName,
      reporterEmail: formData.reporterEmail,
      reporterPhone: formData.reporterPhone,
      imageUrl: formData.image?.previewUrl || null,
      coordinates:
        formData.latitude && formData.longitude
          ? {
              lat: parseFloat(formData.latitude),
              lng: parseFloat(formData.longitude)
            }
          : null
    };

    try {
      const createdIssue = await onSubmit(payload);
      if (createdIssue) {
        navigate(`/issues/${createdIssue._id || createdIssue.id}`);
      } else {
        navigate("/my-reports");
      }
    } catch (err) {
      // Error handling is handled in useIssues/api
    }
  };

  const descLength = formData.description.length;
  const maxDescLength = 1500;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SECTION 1: Core Issue Details */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <FileText className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            1. Problem Description
          </h3>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Issue Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Broken Streetlight near Market Crossing"
            maxLength={100}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? "border-rose-500 focus:ring-rose-500/50"
                : "border-slate-700/80 focus:ring-cyan-500/50 focus:border-cyan-500"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        {/* Category & Priority Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Category <span className="text-rose-400">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer"
            >
              {ISSUE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Urgency / Priority <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ISSUE_PRIORITIES.map((lvl) => {
                const isSelected = formData.priority === lvl;
                const cfg = PRIORITY_CONFIG[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleChange("priority", lvl)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? `${cfg.badge} ring-2 ring-cyan-500 shadow-md`
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800/80"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Detailed Description <span className="text-rose-400">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                descLength > maxDescLength - 100
                  ? "text-rose-400"
                  : "text-slate-500"
              }`}
            >
              {descLength}/{maxDescLength}
            </span>
          </div>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the nature of the fault, risk posed to pedestrian or vehicular traffic, and how long the problem has persisted..."
            maxLength={maxDescLength}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${
              errors.description
                ? "border-rose-500 focus:ring-rose-500/50"
                : "border-slate-700/80 focus:ring-cyan-500/50 focus:border-cyan-500"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>
      </div>

      {/* SECTION 2: Location & Geolocation */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              2. Geographic Location
            </h3>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={LocateFixed}
            loading={locating}
            onClick={handleGetCurrentLocation}
          >
            {locationSuccess ? "GPS Acquired" : "Use Current Location"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Area / Landmark <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. Gandhi Chowk or Patna Main Road"
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${
                errors.location
                  ? "border-rose-500 focus:ring-rose-500/50"
                  : "border-slate-700/80 focus:ring-cyan-500/50 focus:border-cyan-500"
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.location}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Street Address / Pillar / Sector
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="e.g. Near Pillar 42, Sector 3, opposite State Bank"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
        </div>

        {/* Optional Coordinates */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Latitude (Optional)
            </label>
            <input
              type="text"
              value={formData.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
              placeholder="25.5941"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Longitude (Optional)
            </label>
            <input
              type="text"
              value={formData.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
              placeholder="85.1376"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {locationSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              Coordinates locked from device sensors. High accuracy mode engaged.
            </span>
          </div>
        )}
      </div>

      {/* SECTION 3: Visual Proof / Photo Upload */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <ImageUpload
          value={formData.image}
          onChange={(img) => handleChange("image", img)}
          onRemove={() => handleChange("image", null)}
        />
      </div>

      {/* SECTION 4: Citizen Contact Details (For Dispatch Notifications) */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            3. Reporter Contact (For Status Notifications)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={formData.reporterName}
              onChange={(e) => handleChange("reporterName", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.reporterEmail}
              onChange={(e) => handleChange("reporterEmail", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {errors.reporterEmail && (
              <p className="mt-1 text-[11px] text-rose-400">
                {errors.reporterEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.reporterPhone}
              onChange={(e) => handleChange("reporterPhone", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Submission Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">
            Ready to lodge complaint?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Your complaint will be logged with a unique tracking ID and dispatched to municipal authorities.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Send}
            loading={loading}
            className="w-full sm:w-auto px-8"
          >
            REPORT ISSUE
          </Button>
        </div>
      </div>
    </form>
  );
}
