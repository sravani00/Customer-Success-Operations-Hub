'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Plus, 
  Calendar as CalendarIcon, 
  Filter
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function MeetingsPage() {
  const { currentDate, meetings, openQuickAdd } = useAppStore();
  const [filterMode, setFilterMode] = useState<'all' | 'date'>('all');

  const filteredMeetings = filterMode === 'date'
    ? meetings.filter((m) => m.startTime.startsWith(currentDate))
    : meetings;

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

      {/* Date Filter Bar */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>Meeting Date Scope:</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterMode === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Meetings ({meetings.length})
          </button>
          <button
            onClick={() => setFilterMode('date')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              filterMode === 'date' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Active Date: {currentDate} ({meetings.filter(m => m.startTime.startsWith(currentDate)).length})</span>
          </button>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
            <Video className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No meetings scheduled for {currentDate}</h3>
            <p className="text-xs text-slate-400">Click "Schedule New Meeting" or switch to "All Meetings".</p>
          </div>
        ) : (
          filteredMeetings.map((m) => (
            <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition-all">
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
                    <span>• Client: <strong className="text-blue-300 font-sans">{m.clientName}</strong></span>
                  </div>
                </div>

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
                </div>
              </div>

              {/* Meeting Details */}
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
          ))
        )}
      </div>
    </div>
  );
}
