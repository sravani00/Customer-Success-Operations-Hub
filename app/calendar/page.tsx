'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Video, 
  Package, 
  CheckSquare, 
  Clock, 
  Filter,
  Sparkles,
  FileText,
  Mail
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function CalendarPage() {
  const router = useRouter();
  const { currentDate, setCurrentDate, meetings, offers, tasks, followUps, updates } = useAppStore();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>('all');

  // Parse active date to determine year and month
  const activeDateObj = new Date(`${currentDate}T00:00:00`);
  const activeYear = activeDateObj.getFullYear();
  const activeMonth = activeDateObj.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthName = monthNames[activeMonth];

  // Number of days in active month
  const daysInMonthCount = new Date(activeYear, activeMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(activeYear, activeMonth, 1).getDay(); // 0 = Sun, 6 = Sat

  // Days array for current month
  const monthDays = Array.from({ length: daysInMonthCount }, (_, i) => {
    const dayNum = i + 1;
    const monthStr = String(activeMonth + 1).padStart(2, '0');
    const dayStr = String(dayNum).padStart(2, '0');
    const dateStr = `${activeYear}-${monthStr}-${dayStr}`;
    return {
      dayNum,
      dateStr,
      isSelected: dateStr === currentDate
    };
  });

  // Dynamic Steppers
  const handlePrevDay = () => {
    const d = new Date(`${currentDate}T00:00:00`);
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setCurrentDate(`${y}-${m}-${day}`);
  };

  const handleNextDay = () => {
    const d = new Date(`${currentDate}T00:00:00`);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setCurrentDate(`${y}-${m}-${day}`);
  };

  const handleTodayClick = () => {
    setCurrentDate('2026-08-17');
  };

  const handleDateClick = (dateStr: string) => {
    setCurrentDate(dateStr);
    router.push(`/daily-details?date=${dateStr}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Calendar Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Operations Calendar
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono font-semibold">
                {currentMonthName} {activeYear}
              </span>
            </h1>
            <p className="text-xs text-slate-400">Consolidated date grid with dynamic category indicators & 1-click drilldown</p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
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

          <div className="flex items-center space-x-1.5">
            <button 
              onClick={handlePrevDay}
              title="Previous Day"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleTodayClick}
              className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-colors"
            >
              Today (Aug 17)
            </button>
            <button 
              onClick={handleNextDay}
              title="Next Day"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between overflow-x-auto gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Category Filters:</span>
        </div>
        <div className="flex items-center space-x-2 text-xs flex-wrap gap-y-2">
          {[
            { key: 'all', label: 'Show All' },
            { key: 'client-update', label: 'Client Update' },
            { key: 'internal-update', label: 'Internal Update' },
            { key: 'meeting', label: 'Meeting' },
            { key: 'offer', label: 'Offer' },
            { key: 'task', label: 'Task' },
            { key: 'follow-up', label: 'Follow-up' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedTaxonomy(cat.key)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                selectedTaxonomy === cat.key
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2 border-b border-slate-800/80">
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
            {/* Blank cells for alignment */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`blank-${idx}`} className="h-32 rounded-xl bg-slate-950/20 border border-slate-800/30 opacity-40"></div>
            ))}

            {monthDays.map((day) => {
              const isToday = day.dateStr === '2026-08-17';
              const isSelected = day.dateStr === currentDate;

              // REAL DATA COUNTS FROM STORE
              const dateClientUpdates = updates.filter((u) => u.timestamp.startsWith(day.dateStr) && u.source === 'Client');
              const dateInternalUpdates = updates.filter((u) => u.timestamp.startsWith(day.dateStr) && u.source === 'Internal');
              const dateMeetings = meetings.filter((m) => m.startTime.startsWith(day.dateStr));
              const dateOffers = offers.filter((o) => o.followUpDate === day.dateStr || o.testStartDate === day.dateStr);
              const dateTasks = tasks.filter((t) => t.dueDate === day.dateStr);
              const dateFollowUps = followUps.filter((f) => f.dueDate === day.dateStr || f.reminderAt?.startsWith(day.dateStr));

              // Category Filter visibility rules
              const showClientUpdates = (selectedTaxonomy === 'all' || selectedTaxonomy === 'client-update') && dateClientUpdates.length > 0;
              const showInternalUpdates = (selectedTaxonomy === 'all' || selectedTaxonomy === 'internal-update') && dateInternalUpdates.length > 0;
              const showMeetings = (selectedTaxonomy === 'all' || selectedTaxonomy === 'meeting') && dateMeetings.length > 0;
              const showOffers = (selectedTaxonomy === 'all' || selectedTaxonomy === 'offer') && dateOffers.length > 0;
              const showTasks = (selectedTaxonomy === 'all' || selectedTaxonomy === 'task') && dateTasks.length > 0;
              const showFollowUps = (selectedTaxonomy === 'all' || selectedTaxonomy === 'follow-up') && dateFollowUps.length > 0;

              return (
                <div
                  key={day.dateStr}
                  onClick={() => handleDateClick(day.dateStr)}
                  className={`h-32 p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-950/80 to-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-blue-950/50'
                      : isToday
                      ? 'bg-slate-900 border-blue-500/50'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white shadow-md' : isToday ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-300'
                    }`}>
                      {day.dayNum}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider font-mono">Today</span>
                    )}
                  </div>

                  {/* Multi-Category Indicators */}
                  <div className="space-y-1 my-auto text-[10px]">
                    {showClientUpdates && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/25 text-blue-300 font-medium">
                        <span className="flex items-center gap-1"><FileText className="w-2.5 h-2.5" /> Client Update</span>
                        <span className="font-bold font-mono">{dateClientUpdates.length}</span>
                      </div>
                    )}
                    {showInternalUpdates && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/25 text-purple-300 font-medium">
                        <span className="flex items-center gap-1"><FileText className="w-2.5 h-2.5" /> Internal Update</span>
                        <span className="font-bold font-mono">{dateInternalUpdates.length}</span>
                      </div>
                    )}
                    {showMeetings && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-medium">
                        <span className="flex items-center gap-1"><Video className="w-2.5 h-2.5" /> Meeting</span>
                        <span className="font-bold font-mono">{dateMeetings.length}</span>
                      </div>
                    )}
                    {showOffers && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/25 text-amber-300 font-medium">
                        <span className="flex items-center gap-1"><Package className="w-2.5 h-2.5" /> Offer</span>
                        <span className="font-bold font-mono">{dateOffers.length}</span>
                      </div>
                    )}
                    {showTasks && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 font-medium">
                        <span className="flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5" /> Task</span>
                        <span className="font-bold font-mono">{dateTasks.length}</span>
                      </div>
                    )}
                    {showFollowUps && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/25 text-rose-300 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Follow-up</span>
                        <span className="font-bold font-mono">{dateFollowUps.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week / Day / Agenda Views */}
      {viewMode !== 'month' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-4 shadow-xl">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Interactive {viewMode.toUpperCase()} Operations View</h3>
          <p className="text-xs max-w-md mx-auto text-slate-400">
            Viewing operational schedule breakdown for <strong className="text-blue-300 font-mono">{currentDate}</strong>. Click below to drill down into the full Daily Details workspace.
          </p>
          <Link
            href={`/daily-details?date=${currentDate}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>Open Daily Operations Workspace ({currentDate})</span>
          </Link>
        </div>
      )}
    </div>
  );
}
