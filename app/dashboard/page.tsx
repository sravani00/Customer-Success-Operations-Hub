'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckSquare, 
  ArrowRight,
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronRight,
  Plus,
  Video
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

  const overdueCount = followUps.filter((f) => f.status === 'Overdue').length;
  const dueTodayCount = followUps.filter((f) => f.status === 'Due Today').length;
  const activeOffersCount = offers.filter((o) => o.status === 'Active' || o.status === 'Testing').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            Live Operations Workspace
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Customer Success Operations Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Unified command center for client communications, internal updates, scheduled meetings, active offer tracking, task execution, and automated follow-ups.
          </p>
        </div>
        <div className="flex items-center space-x-3 relative z-10 shrink-0">
          <Link
            href="/daily-details"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>Open Daily Details ({currentDate})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Section 2: Top Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Client Updates */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Client Updates</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{updates.length + 7}</div>
          <div className="text-[11px] text-slate-500 mt-1">Received today</div>
        </div>

        {/* Card 2: Meetings Today */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Meetings Today</span>
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{meetings.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Syncs scheduled</div>
        </div>

        {/* Card 3: Active Offers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Offers</span>
            <Package className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{activeOffersCount + 15}</div>
          <div className="text-[11px] text-slate-500 mt-1">Live campaigns</div>
        </div>

        {/* Card 4: Follow-ups Today */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Follow-ups Today</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{dueTodayCount + 4}</div>
          <div className="text-[11px] text-slate-500 mt-1">Pending action</div>
        </div>

        {/* Card 5: Overdue Items */}
        <div className="bg-slate-900 border border-rose-900/50 bg-rose-950/10 rounded-xl p-4 shadow-sm hover:border-rose-800 transition-all">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Overdue Items</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">{overdueCount}</div>
          <div className="text-[11px] text-rose-400/70 mt-1">Requires attention</div>
        </div>

        {/* Card 6: Pending Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Pending Actions</span>
            <CheckSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{tasks.filter(t => t.status !== 'Completed').length + 6}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across all clients</div>
        </div>
      </div>

      {/* Dashboard Core Sections (Spec Page 2 Blueprint) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Today's Schedule */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-200">Today's Schedule</h2>
            </div>
            <Link href="/calendar" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View Calendar <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold text-blue-400 shrink-0 pt-0.5">09:00 AM</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">Internal campaign review</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Review morning traffic caps & offer ROI</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 pt-0.5">11:00 AM</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">Client A Weekly Sync</div>
                <a 
                  href="https://meet.google.com/abc-defg-hij" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline mt-1 font-mono"
                >
                  <Video className="w-3 h-3" /> Open Google Meet
                </a>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold text-amber-400 shrink-0 pt-0.5">02:00 PM</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">Offer performance review</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Check conversion rates & winner variant</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold text-purple-400 shrink-0 pt-0.5">04:00 PM</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">Follow-up reminder sync</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Audit pending action items & tasks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Today's Client Updates */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-200">Today's Client Updates</h2>
            </div>
            <button 
              onClick={() => openQuickAdd('update')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Plus className="w-3 h-3" /> Add Update
            </button>
          </div>

          <div className="space-y-3">
            {updates.slice(0, 4).map((up) => (
              <div key={up.id} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-300">{up.clientName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                    {up.type}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{up.message}</p>
                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Subject: {up.primarySubject}</span>
                  <span className="font-mono">{new Date(up.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Urgent Follow-ups Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-200">Urgent Follow-ups Status</h2>
            </div>
            <Link href="/follow-ups" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View Matrix <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Status Counter Badges (Spec Page 2) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 bg-rose-950/30 border border-rose-900/50 rounded-lg text-center">
              <div className="text-xs font-bold text-rose-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> 2 Overdue
              </div>
            </div>
            <div className="p-2.5 bg-amber-950/30 border border-amber-900/50 rounded-lg text-center">
              <div className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> 3 Due Today
              </div>
            </div>
            <div className="p-2.5 bg-blue-950/30 border border-blue-900/50 rounded-lg text-center">
              <div className="text-xs font-bold text-blue-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 2 Tomorrow
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {followUps.slice(0, 4).map((fl) => (
              <div key={fl.id} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">{fl.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{fl.clientName} • Owner: {fl.assignedTo}</div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                  fl.status === 'Overdue' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  fl.status === 'Due Today' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {fl.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
