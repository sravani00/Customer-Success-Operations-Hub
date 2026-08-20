'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Plus, 
  ArrowRight,
  Filter,
  Calendar as CalendarIcon,
  ArrowLeft
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function FollowUpsPage() {
  const { currentDate, followUps, updateFollowUpStatus, openQuickAdd } = useAppStore();
  const [filterMode, setFilterMode] = useState<'date' | 'all'>('date');

  const filteredFollowUps = filterMode === 'date'
    ? followUps.filter((f) => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate))
    : followUps;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/dashboard" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to Operations Dashboard
              </Link>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Follow-up Tracking Matrix
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                Active Date: {currentDate}
              </span>
            </h1>
            <p className="text-xs text-slate-400">Ensures zero missed commitments across all client offers, meetings, and updates</p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('followup')}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-rose-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Follow-up Item</span>
        </button>
      </div>

      {/* Scope Filter Bar */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Filter className="w-4 h-4 text-rose-400" />
          <span>Follow-up Scope:</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterMode('date')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              filterMode === 'date' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Active Date: {currentDate} ({followUps.filter(f => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate)).length})</span>
          </button>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterMode === 'all' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Follow-ups ({followUps.length})
          </button>
        </div>
      </div>

      {/* Task Status Life-cycle Legend */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 font-semibold uppercase tracking-wider">Task Status Life-cycle:</span>
        <div className="flex items-center space-x-2 font-bold text-slate-300">
          <span className="px-2 py-1 rounded bg-slate-800">Not Started</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">In Progress</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300">Waiting</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">Completed (or Cancelled)</span>
        </div>
      </div>

      {/* Follow-up Tracking Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="font-bold text-sm text-white">
            {filterMode === 'date' ? `Follow-up Reminders for ${currentDate}` : 'Live Follow-up Matrix (All Dates)'}
          </h2>
          <span className="text-xs text-slate-400 font-mono">Count: {filteredFollowUps.length}</span>
        </div>

        <div className="overflow-x-auto">
          {filteredFollowUps.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No follow-up reminders due on {currentDate}. Click "Add Follow-up Item" or select "All Follow-ups".
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">FOLLOW-UP TASK</th>
                  <th className="py-3 px-4">CLIENT</th>
                  <th className="py-3 px-4">OFFER</th>
                  <th className="py-3 px-4">OWNER</th>
                  <th className="py-3 px-4">DUE DATE</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredFollowUps.map((fl) => (
                  <tr key={fl.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          fl.status === 'Overdue' ? 'bg-rose-500 animate-ping' :
                          fl.status === 'Due Today' ? 'bg-amber-400' :
                          fl.status === 'Completed' ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}></span>
                        <span>{fl.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-blue-300 font-semibold">{fl.clientName}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300">{fl.offerName || '—'}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{fl.assignedTo}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{fl.dueDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={fl.status}
                        onChange={(e) => updateFollowUpStatus(fl.id, e.target.value as any)}
                        className={`px-2.5 py-1 rounded text-xs font-bold font-mono focus:outline-none cursor-pointer ${
                          fl.status === 'Overdue' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                          fl.status === 'Due Today' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          fl.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        <option value="Pending" className="bg-slate-900 text-slate-200">Pending</option>
                        <option value="Due Today" className="bg-slate-900 text-slate-200">Due Today</option>
                        <option value="Overdue" className="bg-slate-900 text-slate-200">Overdue</option>
                        <option value="Completed" className="bg-slate-900 text-slate-200">Done / Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
