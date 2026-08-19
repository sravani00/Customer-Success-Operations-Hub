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
  Check
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Settings & Integration Engine
            </h1>
            <p className="text-xs text-slate-400">OAuth 2.0 authorized pipeline, Redis background sync engine, and taxonomy config</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 border border-slate-700"
        >
          {resetDone ? <Check className="w-4 h-4 text-emerald-400" /> : <RotateCcw className="w-4 h-4 text-slate-400" />}
          <span>{resetDone ? 'Demo Reset Complete!' : 'Reset Demo Data'}</span>
        </button>
      </div>

      {/* OAuth & Connection Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="font-bold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Google OAuth 2.0 Security & Scope Status
        </h2>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Google Account Connected: {settings.userEmail}
            </div>
            <p className="text-slate-400">Scopes granted: Gmail API Read/Modify, Google Calendar Webhooks, Google Meet Auto-links.</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-xs">
            OAuth 2.0 Active
          </span>
        </div>
      </div>

      {/* Google Calendar Sync Technical Engine Toggles (Spec Section 12 Page 4) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="font-bold text-sm text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-400" /> Sync Configuration Options & Toggles (Spec Section 12)
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
              <div key={toggle.key} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{toggle.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{toggle.desc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ [toggle.key]: !isChecked })}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isChecked ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isChecked ? 'left-6' : 'left-1'}`}></span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Sync Frequency Option */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Sync Engine Frequency</h3>
          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            {['Real-time Webhooks', '5-minute Polling', '15-minute Polling'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => updateSettings({ frequency: freq as any })}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  settings.frequency === freq 
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
