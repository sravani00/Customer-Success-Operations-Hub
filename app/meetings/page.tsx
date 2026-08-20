'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Plus, 
  ExternalLink, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  Clock, 
  FileText, 
  Sparkles,
  Users
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function MeetingsPage() {
  const { currentDate, meetings, openQuickAdd } = useAppStore();
  const [filterMode, setFilterMode] = useState<'date' | 'all'>('date');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Google Calendar & Meet Integration Hub
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">Bi-directional Sync</span>
            </h1>
            <p className="text-xs text-slate-400">Automated bi-directional synchronization with Google Calendar and Google Meet links</p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('meeting')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Meeting</span>
        </button>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-base font-bold text-white">{m.title}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    m.status === 'Scheduled' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono">
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>{new Date(m.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span>• Client: {m.clientName}</span>
                </div>
              </div>

              {/* Quick Action Controls (Spec Section 9) */}
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                {m.meetLink && (
                  <a
                    href={m.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Open Google Meet</span>
                  </a>
                )}
                <button className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300">
                  + Add Notes
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300">
                  + Add Action Item
                </button>
              </div>
            </div>

            {/* Meeting Schema Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-300 block">Participants & Organizer:</span>
                <p className="text-slate-400 font-mono">Organizer: {m.organizer}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {m.participants.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-blue-300 font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-300 block">Meeting Notes & Key Decisions:</span>
                <p className="text-slate-300">{m.meetingNotes}</p>
                <div className="pt-1 text-[11px] text-emerald-400 font-mono">
                  Decisions: {m.keyDecisions.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
