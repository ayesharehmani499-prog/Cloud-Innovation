import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { AlertCircle, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
        404 Error
      </span>
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
        The civic portal route you requested does not exist or has been relocated in the municipal directory.
      </p>

      <div className="pt-4 flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="sm" icon={Home}>
            Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="sm" icon={Compass}>
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
