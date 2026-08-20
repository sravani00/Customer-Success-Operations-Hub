'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckSquare, 
  ArrowRight,
  TrendingUp,
  FileText,
  ChevronRight,
  Plus,
  Video,
  Sparkles,
  Zap,
  RefreshCw,
  Trash2,
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function DashboardPage() {
  const { 
    currentDate, 
    clients, 
    offers, 
    updates, 
    meetings, 
    tasks, 
    followUps,
    openQuickAdd,
    populateDemoData,
    clearAllData
  } = useAppStore();

  // Real-time clock state
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      setCurrentTimeStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered metrics for currentDate
  const dateMeetings = meetings.filter((m) => m.startTime.startsWith(currentDate));
  const dateUpdates = updates.filter((u) => u.timestamp.startsWith(currentDate));
  const dateTasks = tasks.filter((t) => t.dueDate === currentDate);
  const dateFollowUps = followUps.filter((f) => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate));

  const overdueCount = followUps.filter((f) => f.status === 'Overdue').length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;
  const activeOffersCount = offers.filter((o) => o.status === 'Active' || o.status === 'Testing').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Real-time Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 p-6 md:p-8 border border-indigo-500/30 shadow-2xl shadow-indigo-950/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE AUTO-SYNC ACTIVE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                {currentTimeStr || '15:12:07'} Local Time
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
                Active Date: {currentDate}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 pt-1">
              Customer Success Operations Center
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time executive command center for client success workflows, automated Google Meet scheduling, task execution, and proactive follow-up tracking.
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-y-2">
            {clients.length === 0 ? (
              <button
                onClick={populateDemoData}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all border border-emerald-400/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>🌱 Load Demo Data</span>
              </button>
            ) : (
              <button
                onClick={clearAllData}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                title="Clear Workspace"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              onClick={() => openQuickAdd('update')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Add</span>
            </button>

            <Link
              href={`/daily-details?date=${currentDate}`}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all"
            >
              <span>Daily Details ({currentDate})</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Vibrant Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Active Clients */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-4 shadow-xl transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Active Clients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">{clients.length}</div>
          <div className="text-[11px] text-blue-400 font-mono mt-1 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{clients.filter(c => c.status === 'Active').length} Verified Active</span>
          </div>
        </div>

        {/* Card 2: Meetings Today */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-4 shadow-xl transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Meetings ({currentDate})</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">{dateMeetings.length}</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
            {dateMeetings.length > 0 ? `${dateMeetings.length} Scheduled` : 'No Syncs Today'}
          </div>
        </div>

        {/* Card 3: Follow-ups Due */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-4 shadow-xl transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Follow-ups ({currentDate})</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">{dateFollowUps.length}</div>
          <div className="text-[11px] text-amber-400 font-mono mt-1 font-semibold">
            {dateFollowUps.length > 0 ? 'Reminders Set' : 'All Clear'}
          </div>
        </div>

        {/* Card 4: Overdue Items */}
        <div className={`bg-gradient-to-b from-slate-900 to-slate-950 border rounded-2xl p-4 shadow-xl transition-all group ${
          overdueCount > 0 ? 'border-rose-500/50 ring-1 ring-rose-500/20 bg-rose-950/10' : 'border-slate-800/80'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">Overdue Items</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-400 tracking-tight">{overdueCount}</div>
          <div className="text-[11px] text-rose-400/80 font-mono mt-1 font-semibold">
            {overdueCount > 0 ? 'Action Required' : 'Zero Overdue'}
          </div>
        </div>

        {/* Card 5: Operational Tasks */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-4 shadow-xl transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Tasks Due</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">{dateTasks.length}</div>
          <div className="text-[11px] text-indigo-300 font-mono mt-1 font-semibold">
            Total Pending: {pendingTasksCount}
          </div>
        </div>
      </div>

      {/* Main Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Today's Schedule */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Video className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-white">
                Meetings on {currentDate}
              </h2>
            </div>
            <Link href="/meetings" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-bold">
              All Meetings <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {dateMeetings.length === 0 ? (
              <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 text-center space-y-2">
                <Video className="w-6 h-6 text-slate-600 mx-auto" />
                <p>No meetings scheduled for {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('meeting')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold transition-colors"
                >
                  + Schedule Meeting
                </button>
              </div>
            ) : (
              dateMeetings.map((meet) => (
                <div key={meet.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-3 hover:border-emerald-500/30 transition-all">
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 pt-0.5 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {new Date(meet.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white line-clamp-1">{meet.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Client: <strong className="text-blue-300">{meet.clientName}</strong></div>
                    {meet.meetLink && (
                      <a 
                        href={meet.meetLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline mt-1 font-mono font-bold"
                      >
                        <Video className="w-3 h-3" /> Open Google Meet
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Client Updates */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-white">
                Updates on {currentDate}
              </h2>
            </div>
            <button 
              onClick={() => openQuickAdd('update')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-bold"
            >
              <Plus className="w-3 h-3" /> Add Update
            </button>
          </div>

          <div className="space-y-3">
            {dateUpdates.length === 0 ? (
              <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 text-center space-y-2">
                <FileText className="w-6 h-6 text-slate-600 mx-auto" />
                <p>No client updates logged for {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('update')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold transition-colors"
                >
                  + Add Client Update
                </button>
              </div>
            ) : (
              dateUpdates.map((up) => (
                <div key={up.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-300">{up.clientName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-semibold">
                      {up.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{up.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Follow-ups & Tasks */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-white">
                Follow-ups for {currentDate}
              </h2>
            </div>
            <Link href="/follow-ups" className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-bold">
              Matrix <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {dateFollowUps.length === 0 ? (
              <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 text-center space-y-2">
                <Clock className="w-6 h-6 text-slate-600 mx-auto" />
                <p>No follow-ups due on {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('followup')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold transition-colors"
                >
                  + Add Follow-up
                </button>
              </div>
            ) : (
              dateFollowUps.map((fl) => (
                <div key={fl.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{fl.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{fl.clientName} • Owner: {fl.assignedTo}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                    fl.status === 'Overdue' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    fl.status === 'Due Today' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {fl.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
