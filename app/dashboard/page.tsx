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
    openQuickAdd
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-6 md:p-8 border border-indigo-700/40 shadow-xl shadow-indigo-950/10 text-white">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-mono font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE AUTO-SYNC ACTIVE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono font-semibold">
                <Activity className="w-3.5 h-3.5 text-blue-300" />
                {currentTimeStr || '15:12:07'} Local Time
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono font-semibold">
                Active Date: {currentDate}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 pt-1">
              Customer Success Operations Center
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </h1>
            <p className="text-xs md:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Real-time executive command center for client success workflows, automated Google Meet scheduling, task execution, and proactive follow-up tracking.
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-y-2">

            <button
              onClick={() => openQuickAdd('update')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all border border-blue-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Add</span>
            </button>

            <Link
              href={`/daily-details?date=${currentDate}`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center space-x-2 shadow-xs transition-all"
            >
              <span>Daily Details ({currentDate})</span>
              <ArrowRight className="w-4 h-4 text-blue-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Vibrant Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Active Clients */}
        <div className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Clients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{clients.length}</div>
          <div className="text-[11px] text-blue-700 font-mono mt-1 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{clients.filter(c => c.status === 'Active').length} Verified Active</span>
          </div>
        </div>

        {/* Card 2: Meetings Today */}
        <div className="bg-white border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Meetings ({currentDate})</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{dateMeetings.length}</div>
          <div className="text-[11px] text-emerald-700 font-mono mt-1 font-semibold">
            {dateMeetings.length > 0 ? `${dateMeetings.length} Scheduled` : 'No Syncs Today'}
          </div>
        </div>

        {/* Card 3: Follow-ups Due */}
        <div className="bg-white border border-slate-200/90 hover:border-amber-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Follow-ups ({currentDate})</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{dateFollowUps.length}</div>
          <div className="text-[11px] text-amber-700 font-mono mt-1 font-semibold">
            {dateFollowUps.length > 0 ? 'Reminders Set' : 'All Clear'}
          </div>
        </div>

        {/* Card 4: Overdue Items */}
        <div className={`bg-white border rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group ${
          overdueCount > 0 ? 'border-rose-300 bg-rose-50/40' : 'border-slate-200/90'
        }`}>
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Overdue Items</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 tracking-tight">{overdueCount}</div>
          <div className="text-[11px] text-rose-700 font-mono mt-1 font-semibold">
            {overdueCount > 0 ? 'Action Required' : 'Zero Overdue'}
          </div>
        </div>

        {/* Card 5: Operational Tasks */}
        <div className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tasks Due</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{dateTasks.length}</div>
          <div className="text-[11px] text-indigo-700 font-mono mt-1 font-semibold">
            Total Pending: {pendingTasksCount}
          </div>
        </div>
      </div>

      {/* Main Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Today's Schedule */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Video className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Meetings on {currentDate}
              </h2>
            </div>
            <Link href="/meetings" className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-bold">
              All Meetings <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {dateMeetings.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center space-y-2">
                <Video className="w-6 h-6 text-slate-400 mx-auto" />
                <p>No meetings scheduled for {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('meeting')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold transition-colors"
                >
                  + Schedule Meeting
                </button>
              </div>
            ) : (
              dateMeetings.map((meet) => (
                <div key={meet.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3 hover:border-emerald-300 transition-all">
                  <span className="text-xs font-mono font-bold text-emerald-700 shrink-0 pt-0.5 bg-emerald-100/60 px-2 py-1 rounded border border-emerald-200">
                    {new Date(meet.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">{meet.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-mono">Client: <strong className="text-blue-700">{meet.clientName}</strong></div>
                    {meet.meetLink && (
                      <a 
                        href={meet.meetLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:underline mt-1 font-mono font-bold"
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
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Updates on {currentDate}
              </h2>
            </div>
            <button 
              onClick={() => openQuickAdd('update')}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-bold"
            >
              <Plus className="w-3 h-3" /> Add Update
            </button>
          </div>

          <div className="space-y-3">
            {dateUpdates.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center space-y-2">
                <FileText className="w-6 h-6 text-slate-400 mx-auto" />
                <p>No client updates logged for {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('update')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold transition-colors"
                >
                  + Add Client Update
                </button>
              </div>
            ) : (
              dateUpdates.map((up) => (
                <div key={up.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-700">{up.clientName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-mono font-semibold">
                      {up.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">{up.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Follow-ups & Tasks */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Follow-ups for {currentDate}
              </h2>
            </div>
            <Link href="/follow-ups" className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold">
              Matrix <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {dateFollowUps.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center space-y-2">
                <Clock className="w-6 h-6 text-slate-400 mx-auto" />
                <p>No follow-ups due on {currentDate}.</p>
                <button
                  onClick={() => openQuickAdd('followup')}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold transition-colors"
                >
                  + Add Follow-up
                </button>
              </div>
            ) : (
              dateFollowUps.map((fl) => (
                <div key={fl.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:border-rose-300 transition-all">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{fl.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{fl.clientName} • Owner: {fl.assignedTo}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                    fl.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    fl.status === 'Due Today' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
