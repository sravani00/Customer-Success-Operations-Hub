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
  Sparkles,
  FileText,
  ArrowRight,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function CalendarPage() {
  const router = useRouter();
  const { currentDate, setCurrentDate, meetings, offers, tasks, followUps, updates } = useAppStore();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'custom'>('month');

  // Custom Range State
  const [customStartDate, setCustomStartDate] = useState<string>('2026-08-15');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-08-20');

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

  // Calculate Week Days (7 days centered around active date)
  const currentDayOfWeek = activeDateObj.getDay();
  const startOfWeekObj = new Date(activeDateObj);
  startOfWeekObj.setDate(activeDateObj.getDate() - currentDayOfWeek);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeekObj);
    d.setDate(startOfWeekObj.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;
    return {
      dayNum: d.getDate(),
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      dateStr,
      isSelected: dateStr === currentDate
    };
  });

  // Calculate Custom Range Days
  const getCustomRangeDays = () => {
    const start = new Date(`${customStartDate}T00:00:00`);
    const end = new Date(`${customEndDate}T00:00:00`);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return [];

    const daysList = [];
    let curr = new Date(start);
    while (curr <= end) {
      const y = curr.getFullYear();
      const m = String(curr.getMonth() + 1).padStart(2, '0');
      const day = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${day}`;
      daysList.push({
        dayNum: curr.getDate(),
        dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][curr.getDay()],
        dateStr,
        isSelected: dateStr === currentDate
      });
      curr.setDate(curr.getDate() + 1);
    }
    return daysList;
  };

  const customRangeDays = getCustomRangeDays();

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
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setCurrentDate(`${y}-${m}-${day}`);
  };

  const handleSelectDate = (dateStr: string) => {
    setCurrentDate(dateStr);
  };

  // Filter items for selected day/date
  const dateMeetings = meetings.filter((m) => m.startTime.startsWith(currentDate));
  const dateUpdates = updates.filter((u) => u.timestamp.startsWith(currentDate));
  const dateTasks = tasks.filter((t) => t.dueDate === currentDate);
  const dateFollowUps = followUps.filter((f) => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate));

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
            <p className="text-xs text-slate-400">Consolidated operational schedule with dynamic Month, Week, Day & Custom Date Range views</p>
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
              onClick={() => setViewMode('custom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'custom' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Custom Dates</span>
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
              Today
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

      {/* 1. MONTH VIEW */}
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
              const realToday = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
              const isToday = day.dateStr === realToday || day.dateStr === '2026-08-20';
              const isSelected = day.dateStr === currentDate;

              const cellUpdates = updates.filter((u) => u.timestamp.startsWith(day.dateStr));
              const cellMeetings = meetings.filter((m) => m.startTime.startsWith(day.dateStr));
              const cellOffers = offers.filter((o) => o.followUpDate === day.dateStr || o.testStartDate === day.dateStr);
              const cellTasks = tasks.filter((t) => t.dueDate === day.dateStr);
              const cellFollowUps = followUps.filter((f) => f.dueDate === day.dateStr || f.reminderAt?.startsWith(day.dateStr));

              return (
                <div
                  key={day.dateStr}
                  onClick={() => handleSelectDate(day.dateStr)}
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
                    {cellUpdates.length > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/25 text-blue-300 font-medium">
                        <span className="flex items-center gap-1"><FileText className="w-2.5 h-2.5" /> Updates</span>
                        <span className="font-bold font-mono">{cellUpdates.length}</span>
                      </div>
                    )}
                    {cellMeetings.length > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-medium">
                        <span className="flex items-center gap-1"><Video className="w-2.5 h-2.5" /> Meetings</span>
                        <span className="font-bold font-mono">{cellMeetings.length}</span>
                      </div>
                    )}
                    {cellOffers.length > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/25 text-amber-300 font-medium">
                        <span className="flex items-center gap-1"><Package className="w-2.5 h-2.5" /> Offers</span>
                        <span className="font-bold font-mono">{cellOffers.length}</span>
                      </div>
                    )}
                    {cellTasks.length > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 font-medium">
                        <span className="flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5" /> Tasks</span>
                        <span className="font-bold font-mono">{cellTasks.length}</span>
                      </div>
                    )}
                    {cellFollowUps.length > 0 && (
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/25 text-rose-300 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Follow-ups</span>
                        <span className="font-bold font-mono">{cellFollowUps.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>7-Day Operational Week Breakdown</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-normal">
                {weekDays[0]?.dateStr} to {weekDays[6]?.dateStr}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDays.map((wd) => {
              const dayMeetings = meetings.filter((m) => m.startTime.startsWith(wd.dateStr));
              const dayTasks = tasks.filter((t) => t.dueDate === wd.dateStr);
              const dayUpdates = updates.filter((u) => u.timestamp.startsWith(wd.dateStr));
              const dayFollowUps = followUps.filter((f) => f.dueDate === wd.dateStr || f.reminderAt?.startsWith(wd.dateStr));

              return (
                <div
                  key={wd.dateStr}
                  onClick={() => handleSelectDate(wd.dateStr)}
                  className={`p-3 rounded-xl border space-y-3 cursor-pointer transition-all ${
                    wd.isSelected
                      ? 'bg-slate-950 border-blue-500 ring-2 ring-blue-500/40'
                      : wd.dateStr === '2026-08-17'
                      ? 'bg-slate-950 border-blue-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-center border-b border-slate-800/80 pb-2">
                    <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">{wd.dayName}</div>
                    <div className={`text-base font-extrabold font-mono ${wd.isSelected ? 'text-blue-400' : 'text-white'}`}>
                      {wd.dayNum}
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    {/* Meetings */}
                    {dayMeetings.map((m) => (
                      <div key={m.id} className="p-1.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300">
                        <div className="font-bold line-clamp-1">{m.title}</div>
                        <div className="text-[10px] text-emerald-400/80 font-mono">
                          {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}

                    {/* Tasks */}
                    {dayTasks.map((t) => (
                      <div key={t.id} className="p-1.5 rounded bg-indigo-950/40 border border-indigo-800/60 text-indigo-300">
                        <div className="font-semibold line-clamp-1">{t.title}</div>
                        <div className="text-[10px] text-indigo-400/80 font-mono">{t.clientName}</div>
                      </div>
                    ))}

                    {/* Follow-ups */}
                    {dayFollowUps.map((f) => (
                      <div key={f.id} className="p-1.5 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300">
                        <div className="font-semibold line-clamp-1">{f.title}</div>
                      </div>
                    ))}

                    {dayMeetings.length === 0 && dayTasks.length === 0 && dayFollowUps.length === 0 && (
                      <div className="text-[10px] text-slate-600 text-center py-2 italic">
                        No events
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. DAY VIEW */}
      {viewMode === 'day' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 font-mono">
                Single Day Operational Log
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Operational Schedule for {currentDate}
                {currentDate === '2026-08-17' && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">Today</span>
                )}
              </h2>
            </div>

            <Link
              href={`/daily-details?date=${currentDate}`}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 w-fit"
            >
              <span>Open Daily Workspace ({currentDate})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Meetings Column */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Video className="w-4 h-4" /> Meetings ({dateMeetings.length})
                </span>
              </div>
              {dateMeetings.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No meetings scheduled for {currentDate}</p>
              ) : (
                dateMeetings.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{m.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Client: {m.clientName}</p>
                    {m.meetLink && (
                      <a href={m.meetLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-mono">
                        <Video className="w-3 h-3" /> Open Meet
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Tasks Column */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckSquare className="w-4 h-4" /> Tasks Due ({dateTasks.length})
                </span>
              </div>
              {dateTasks.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No tasks due on {currentDate}</p>
              ) : (
                dateTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-white">{t.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Client: {t.clientName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono">{t.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Follow-ups & Updates Column */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> Follow-ups & Updates
                </span>
              </div>
              {dateFollowUps.length === 0 && dateUpdates.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No follow-ups or updates for {currentDate}</p>
              ) : (
                <>
                  {dateFollowUps.map((f) => (
                    <div key={f.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{f.title}</div>
                        <div className="text-[10px] text-slate-400">{f.clientName}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">{f.status}</span>
                    </div>
                  ))}
                  {dateUpdates.map((u) => (
                    <div key={u.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-300">{u.clientName}</span>
                        <span className="text-[10px] font-mono text-slate-500">{u.type}</span>
                      </div>
                      <p className="text-slate-300 line-clamp-2 text-[11px]">{u.message}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. CUSTOM DATES RANGE VIEW */}
      {viewMode === 'custom' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Custom Date Range Selector Controls */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Sliders className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">Select Any Custom Date Range</h3>
                <p className="text-xs text-slate-400">Pick start & end dates to aggregate all operational events across any number of days</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-semibold">From:</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-blue-300 font-mono font-bold px-2.5 py-1 rounded-lg text-xs [color-scheme:dark] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-semibold">To:</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-blue-300 font-mono font-bold px-2.5 py-1 rounded-lg text-xs [color-scheme:dark] focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Range Quick Preset Shortcuts */}
              <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => { setCustomStartDate('2026-08-15'); setCustomEndDate('2026-08-17'); }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  3 Days
                </button>
                <button
                  onClick={() => { setCustomStartDate('2026-08-11'); setCustomEndDate('2026-08-17'); }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  7 Days
                </button>
                <button
                  onClick={() => { setCustomStartDate('2026-08-01'); setCustomEndDate('2026-08-17'); }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  17 Days
                </button>
              </div>
            </div>
          </div>

          {/* Custom Range Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Showing operations from <strong className="text-blue-300">{customStartDate}</strong> to <strong className="text-blue-300">{customEndDate}</strong> ({customRangeDays.length} days total)</span>
            </div>

            {customRangeDays.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Invalid range selected. Please ensure "From Date" is prior to or equal to "To Date".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customRangeDays.map((cDay) => {
                  const dayMeetings = meetings.filter((m) => m.startTime.startsWith(cDay.dateStr));
                  const dayTasks = tasks.filter((t) => t.dueDate === cDay.dateStr);
                  const dayUpdates = updates.filter((u) => u.timestamp.startsWith(cDay.dateStr));
                  const dayFollowUps = followUps.filter((f) => f.dueDate === cDay.dateStr || f.reminderAt?.startsWith(cDay.dateStr));

                  return (
                    <div
                      key={cDay.dateStr}
                      onClick={() => handleSelectDate(cDay.dateStr)}
                      className={`p-4 rounded-xl border space-y-3 cursor-pointer transition-all hover:scale-[1.01] ${
                        cDay.isSelected
                          ? 'bg-slate-950 border-blue-500 ring-2 ring-blue-500/40 shadow-xl'
                          : cDay.dateStr === '2026-08-17'
                          ? 'bg-slate-950 border-blue-500/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white font-mono">{cDay.dateStr}</span>
                          <span className="text-[10px] uppercase font-mono text-slate-400">({cDay.dayName})</span>
                        </div>
                        {cDay.dateStr === '2026-08-17' && (
                          <span className="text-[9px] font-bold text-blue-400 uppercase font-mono">Today</span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        {/* Meetings */}
                        {dayMeetings.map((m) => (
                          <div key={m.id} className="p-2 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300">
                            <div className="font-bold flex items-center justify-between">
                              <span>{m.title}</span>
                              <span className="font-mono text-[10px]">{new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="text-[10px] text-emerald-400/80 mt-0.5">Client: {m.clientName}</div>
                          </div>
                        ))}

                        {/* Tasks */}
                        {dayTasks.map((t) => (
                          <div key={t.id} className="p-2 rounded bg-indigo-950/40 border border-indigo-800/60 text-indigo-300 flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{t.title}</div>
                              <div className="text-[10px] text-indigo-400/80">{t.clientName}</div>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-indigo-900/60 rounded">{t.status}</span>
                          </div>
                        ))}

                        {/* Follow-ups */}
                        {dayFollowUps.map((f) => (
                          <div key={f.id} className="p-2 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-center justify-between">
                            <div className="font-semibold">{f.title}</div>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-rose-900/60 rounded">{f.status}</span>
                          </div>
                        ))}

                        {dayMeetings.length === 0 && dayTasks.length === 0 && dayFollowUps.length === 0 && (
                          <div className="text-xs text-slate-600 text-center py-2 italic">
                            No active commitments on {cDay.dateStr}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
