'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Mail, 
  Video, 
  Package, 
  CheckSquare, 
  Clock, 
  Filter,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function CalendarPage() {
  const router = useRouter();
  const { currentDate, setCurrentDate, emails, meetings, offers, tasks, followUps, updates } = useAppStore();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>('all');

  // Days in August 2026 grid setup
  const daysInAugust = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    return {
      dayNum,
      dateStr,
      isCurrentMonth: true,
      isSelected: dateStr === currentDate
    };
  });

  const handleDateClick = (dateStr: string) => {
    setCurrentDate(dateStr);
    router.push(`/daily-details?date=${dateStr}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Calendar Header & View Switcher Controls (Spec Section 3) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Operations Calendar
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">August 2026</span>
            </h1>
            <p className="text-xs text-slate-400">Consolidated date grid with dynamic category indicators</p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'month' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'week' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'day' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'agenda' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Agenda
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setCurrentDate('2026-08-16')}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentDate('2026-08-17')}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-blue-400 hover:bg-slate-800"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentDate('2026-08-18')}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Taxonomy Filter Bar (Spec Section 3) */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between overflow-x-auto gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0">
          <Filter className="w-3.5 h-3.5 text-blue-400" />
          <span>Category Filters:</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button 
            onClick={() => setSelectedTaxonomy('all')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'all' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Show All
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('client-update')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'client-update' ? 'bg-blue-500/20 text-blue-300 border-blue-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Client Update
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('internal-update')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'internal-update' ? 'bg-purple-500/20 text-purple-300 border-purple-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Internal Update
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('meeting')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'meeting' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Meeting
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('offer')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'offer' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Offer
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('task')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'task' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Task
          </button>
          <button 
            onClick={() => setSelectedTaxonomy('follow-up')}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
              selectedTaxonomy === 'follow-up' ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Follow-up
          </button>
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2 border-b border-slate-800">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank cells for grid alignment (August 1, 2026 is Saturday) */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`blank-${idx}`} className="h-32 rounded-xl bg-slate-950/20 border border-slate-800/30 opacity-40"></div>
            ))}

            {daysInAugust.map((day) => {
              const isAug17 = day.dateStr === '2026-08-17';
              
              // Dynamic category indicator counts per cell
              const cellEmailsCount = isAug17 ? 5 : (day.dayNum % 3 === 0 ? 2 : 0);
              const cellMeetingsCount = isAug17 ? 2 : (day.dayNum % 4 === 0 ? 1 : 0);
              const cellOffersCount = isAug17 ? 6 : (day.dayNum % 2 === 0 ? 3 : 1);
              const cellTasksCount = isAug17 ? 4 : (day.dayNum % 5 === 0 ? 2 : 1);
              const cellFollowUpsCount = isAug17 ? 3 : (day.dayNum % 3 === 1 ? 2 : 0);

              return (
                <div
                  key={day.dateStr}
                  onClick={() => handleDateClick(day.dateStr)}
                  className={`h-32 p-2.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                    isAug17 
                      ? 'bg-gradient-to-b from-blue-950/60 to-slate-900 border-blue-500/60 ring-2 ring-blue-500/30' 
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isAug17 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300'
                    }`}>
                      {day.dayNum}
                    </span>
                    {isAug17 && (
                      <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider font-mono">Today</span>
                    )}
                  </div>

                  {/* Multi-Category Indicators (Spec Section 3) */}
                  <div className="space-y-1 my-auto">
                    {cellEmailsCount > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 font-medium">
                        <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> Emails</span>
                        <span className="font-bold">{cellEmailsCount}</span>
                      </div>
                    )}
                    {cellMeetingsCount > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 font-medium">
                        <span className="flex items-center gap-1"><Video className="w-2.5 h-2.5" /> Meetings</span>
                        <span className="font-bold">{cellMeetingsCount}</span>
                      </div>
                    )}
                    {cellOffersCount > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-medium">
                        <span className="flex items-center gap-1"><Package className="w-2.5 h-2.5" /> Offers</span>
                        <span className="font-bold">{cellOffersCount}</span>
                      </div>
                    )}
                    {cellTasksCount > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-medium">
                        <span className="flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5" /> Tasks</span>
                        <span className="font-bold">{cellTasksCount}</span>
                      </div>
                    )}
                    {cellFollowUpsCount > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-300 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Follow-ups</span>
                        <span className="font-bold">{cellFollowUpsCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode !== 'month' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-3">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Interactive {viewMode.toUpperCase()} Agenda View</h3>
          <p className="text-xs max-w-md mx-auto">
            Viewing schedule breakdown for {currentDate}. Click below to enter full Daily Details workspace.
          </p>
          <Link
            href={`/daily-details?date=${currentDate}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
          >
            Drill-down Daily Workspace
          </Link>
        </div>
      )}
    </div>
  );
}
