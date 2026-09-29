import React from "react";
import Logo from "../components/common/Logo.jsx";
import {
  Award,
  ShieldCheck,
  Users,
  Building2,
  Cpu,
  Workflow,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-2">
      {/* Brand & Mission Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700/50 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Round 3 Smart Governance Challenge
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About CityFix
          </h2>
          <p className="text-base sm:text-lg text-cyan-300 font-semibold">
            Citizen Issue Reporting & Resolution Portal
          </p>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            CityFix is a next-generation civic technology platform engineered for smart cities. It eliminates bureaucratic friction by directly bridging urban residents with municipal field engineers to report, dispatch, remediate, and audit public infrastructure failures.
          </p>
        </div>
      </div>

      {/* Problem Statement Context */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>The Civic Governance Challenge (Round 3)</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Traditional municipal redressal systems suffer from lack of transparency, manual paper complaint routing, absent photo evidence, and zero feedback loops. Citizens rarely know if a pothole or ruptured water main has even been seen by an engineer. CityFix establishes a 100% digital, auditable lifecycle from citizen report to certified sign-off.
        </p>
      </div>

      {/* Dual Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Users className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Empowering Citizens
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Lodge complaints in under 60 seconds with auto-GPS coordinates.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Full audit history: know exactly which department owns your complaint.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Instant alerts when remediation work begins and finishes.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 text-blue-400">
            <Building2 className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Empowering Municipal Authorities
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Unified command desk triaging incoming reports by severity.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Dispatch work orders to Public Works, Electrical, Water, or Sanitation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Measure municipal KPI metrics, resolution velocity, and ward density.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technology Architecture */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>Technology Stack</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Frontend Engine</span>
            <span className="font-bold text-white">React + Vite SPA</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Styling System</span>
            <span className="font-bold text-white">Tailwind CSS</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">API Layer</span>
            <span className="font-bold text-white">Axios REST Client</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Backend Database</span>
            <span className="font-bold text-white">Express + MongoDB</span>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Future Roadmap & Extensibility</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Upcoming expansions include real-time WebSocket vehicle tracking for repair trucks, municipal drone flyover image verification, AI automatic pothole depth estimation, and WhatsApp chatbot complaint lodging.
        </p>
      </div>

      {/* Quick Launch CTA */}
      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900 border border-cyan-500/30">
        <div>
          <h4 className="text-sm font-bold text-white">Experience CityFix</h4>
          <p className="text-xs text-slate-400 mt-0.5">Explore the live dashboard or file a complaint.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button variant="primary" size="sm" icon={ArrowRight}>
              Open Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
