'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Video, 
  Plus, 
  Calendar as CalendarIcon, 
  Filter,
  ArrowLeft,
  FileText,
  CheckCircle2,
  Trash2,
  ListOrdered
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function MeetingsPage() {
  const { currentDate, meetings, openQuickAdd, addMomPoint, removeMomPoint } = useAppStore();
  const [filterMode, setFilterMode] = useState<'date' | 'all'>('date');
  const [newMomInputs, setNewMomInputs] = useState<{ [meetingId: string]: string }>({});

  const filteredMeetings = filterMode === 'date'
    ? meetings.filter((m) => m.startTime.startsWith(currentDate))
    : meetings;

  const handleAddMomSubmit = (meetingId: string, e: React.FormEvent) => {
    e.preventDefault();
    const pointText = newMomInputs[meetingId];
    if (!pointText || !pointText.trim()) return;

    addMomPoint(meetingId, pointText.trim());
    setNewMomInputs((prev) => ({ ...prev, [meetingId]: '' }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/dashboard" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3 h-3" /> Back to Operations Dashboard
              </Link>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Google Calendar & Meet Integration Hub
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">Bi-directional Sync</span>
            </h1>
            <p className="text-xs text-slate-500">Automated bi-directional synchronization with Google Calendar, Meet links, and Minutes of Meeting (MOM)</p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('meeting')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Meeting</span>
        </button>
      </div>

      {/* Scope Filter Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>Meeting Scope:</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterMode('date')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              filterMode === 'date' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Active Date: {currentDate} ({meetings.filter(m => m.startTime.startsWith(currentDate)).length})</span>
          </button>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterMode === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Meetings ({meetings.length})
          </button>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-6">
        {filteredMeetings.length === 0 ? (
          <div className="p-12 bg-white border border-slate-200/90 rounded-2xl text-center space-y-3 shadow-xs">
            <Video className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No meetings scheduled for {currentDate}</h3>
            <p className="text-xs text-slate-500">Click "Schedule New Meeting" or switch to "All Meetings".</p>
          </div>
        ) : (
          filteredMeetings.map((m) => {
            const momPointsList = m.momPoints || [];

            return (
              <div key={m.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5 hover:border-slate-300 hover:shadow-md transition-all">
                {/* Meeting Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-base font-bold text-slate-900">{m.title}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        m.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-mono">
                      <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{new Date(m.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      <span>• Client: <strong className="text-blue-700 font-sans">{m.clientName}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                    {m.meetLink && (
                      <a
                        href={m.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Open Google Meet</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Meeting Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-700 block">Participants & Organizer:</span>
                    <p className="text-slate-600 font-mono">Organizer: {m.organizer}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.participants.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-blue-700 font-mono font-semibold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-700 block">Meeting Overview & Key Decisions:</span>
                    <p className="text-slate-700">{m.meetingNotes}</p>
                    {m.keyDecisions.length > 0 && (
                      <div className="pt-1 text-[11px] text-emerald-700 font-mono font-bold">
                        Key Decisions: {m.keyDecisions.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* MOM Points Section (Minutes of Meeting) */}
                <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ListOrdered className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                        Minutes of Meeting (MOM Points)
                      </h3>
                      <span className="px-2 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold">
                        {momPointsList.length} Points
                      </span>
                    </div>
                  </div>

                  {/* MOM Bullet Points List */}
                  {momPointsList.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No MOM points recorded yet for this meeting.</p>
                  ) : (
                    <ul className="space-y-2">
                      {momPointsList.map((pt, index) => (
                        <li key={index} className="flex items-start justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200/90 text-xs shadow-2xs">
                          <div className="flex items-start space-x-2 text-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{pt}</span>
                          </div>
                          <button
                            onClick={() => removeMomPoint(m.id, index)}
                            title="Delete MOM point"
                            className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add New MOM Point Input */}
                  <form onSubmit={(e) => handleAddMomSubmit(m.id, e)} className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add MOM point / action item..."
                      value={newMomInputs[m.id] || ''}
                      onChange={(e) => setNewMomInputs({ ...newMomInputs, [m.id]: e.target.value })}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center space-x-1 shadow-2xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add MOM</span>
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
