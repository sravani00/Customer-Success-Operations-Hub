'use client';

import React from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Mail, 
  Database, 
  RotateCcw,
  Check,
  Lock,
  KeyRound,
  LogOut
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function SettingsPage() {
  const { settings, updateSettings, resetToDefaults } = useAppStore();
  const [resetDone, setResetDone] = React.useState(false);

  const handleReset = () => {
    resetToDefaults();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Settings & Integration Engine
            </h1>
            <p className="text-xs text-slate-500">OAuth 2.0 authorized pipeline, Redis background sync engine, and taxonomy config</p>
          </div>
        </div>
      </div>

      {/* Website Password Security & Access Protection Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-blue-600" /> Website Password Security & Access Control
        </h2>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              Site Password Gate: Active
            </div>
            <p className="text-slate-600">
              All routes are protected by HTTP-only encrypted session cookies (`site_auth`). Configure password via <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-blue-700 font-mono">SITE_PASSWORD</code> in <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-blue-700 font-mono">.env.local</code>.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold text-xs">
              7-Day Session Active
            </span>
            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/login';
              }}
              className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Site Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* OAuth & Connection Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Google OAuth 2.0 Security & Scope Status
        </h2>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Google Account Connected: {settings.userEmail}
            </div>
            <p className="text-slate-600">Scopes granted: Gmail API Read/Modify, Google Calendar Webhooks, Google Meet Auto-links.</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold text-xs">
            OAuth 2.0 Active
          </span>
        </div>
      </div>

      {/* Google Calendar Sync Technical Engine Toggles (Spec Section 12 Page 4) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-600" /> Sync Configuration Options & Toggles (Spec Section 12)
        </h2>

        {/* Toggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { key: 'syncMeetings', title: 'Sync Meetings', desc: 'Bi-directional sync for scheduled Google Calendar events' },
            { key: 'syncUpdates', title: 'Sync Updates', desc: 'Auto-ingest meeting notes and updates into client logs' },
            { key: 'syncCancellations', title: 'Sync Cancellations', desc: 'Reflect cancelled events immediately in dashboard' },
            { key: 'syncAttendees', title: 'Sync Attendees', desc: 'Map email domain addresses to client profiles' },
            { key: 'importMeetLinks', title: 'Import Google Meet Links', desc: 'Auto-generate and launch Google Meet URLs' },
          ].map((toggle) => {
            const isChecked = settings[toggle.key as keyof typeof settings] as boolean;
            return (
              <div key={toggle.key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{toggle.title}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{toggle.desc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ [toggle.key]: !isChecked })}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isChecked ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isChecked ? 'left-6' : 'left-1'}`}></span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Sync Frequency Option */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Sync Engine Frequency</h3>
          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            {['Real-time Webhooks', '5-minute Polling', '15-minute Polling'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => updateSettings({ frequency: freq as any })}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  settings.frequency === freq 
                    ? 'bg-blue-50 text-blue-700 border-blue-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
