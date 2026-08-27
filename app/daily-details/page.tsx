'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  FileText, 
  Video, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

function DailyDetailsContent() {
  const searchParams = useSearchParams();
  const dateFromQuery = searchParams.get('date');
  const { currentDate, updates, meetings, tasks, followUps, openQuickAdd } = useAppStore();

  const activeDate = dateFromQuery || currentDate;
  const [copied, setCopied] = React.useState(false);

  // Dynamic Date Filtering
  const dateUpdates = updates.filter((u) => u.timestamp.startsWith(activeDate));
  const dateMeetings = meetings.filter((m) => m.startTime.startsWith(activeDate));
  const dateTasks = tasks.filter((t) => t.dueDate === activeDate);
  const dateFollowUps = followUps.filter((f) => f.dueDate === activeDate || f.reminderAt?.startsWith(activeDate));

  // Friendly date formatting
  const formattedDateTitle = new Date(`${activeDate}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCopySummary = () => {
    const summaryText = `Customer Success Operations Recap - ${formattedDateTitle}\n` +
      `Updates: ${dateUpdates.length} | Meetings: ${dateMeetings.length} | Tasks: ${dateTasks.length} | Follow-ups: ${dateFollowUps.length}\n\n` +
      `Key Highlights for ${activeDate}:\n` +
      (dateUpdates.length > 0 ? dateUpdates.map((u) => `- [${u.type}] ${u.clientName}: ${u.message}`).join('\n') : '- No updates logged for this date.');
    
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Back & Breadcrumb navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/calendar"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Calendar</span>
        </Link>
        <button
          onClick={handleCopySummary}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-blue-700 flex items-center space-x-1.5 shadow-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Recap Copied!' : 'Export Daily Recap'}</span>
        </button>
      </div>

      {/* Daily Details Main Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden text-slate-900">
        
        {/* Header Controls */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {formattedDateTitle}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                  {activeDate}
                </span>
              </h1>
              <p className="text-xs text-slate-500">Dynamic Daily Operations Log & Historical Activity</p>
            </div>
          </div>

          {/* Quick Add Action Buttons Bar */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <button
              onClick={() => openQuickAdd('update')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Update</span>
            </button>
            <button
              onClick={() => openQuickAdd('meeting')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Meeting</span>
            </button>
            <button
              onClick={() => openQuickAdd('task')}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Task</span>
            </button>
            <button
              onClick={() => openQuickAdd('followup')}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Follow-up</span>
            </button>
          </div>
        </div>

        {/* Category Breakdown Totals Bar */}
        <div className="px-6 py-3 bg-slate-50/60 border-b border-slate-200 flex items-center justify-around font-mono text-xs font-bold text-slate-700 overflow-x-auto">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-500 font-sans font-medium">Updates</span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">{dateUpdates.length}</span>
          </div>
          <div className="text-slate-300">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-500 font-sans font-medium">Meetings</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{dateMeetings.length}</span>
          </div>
          <div className="text-slate-300">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-500 font-sans font-medium">Tasks</span>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">{dateTasks.length}</span>
          </div>
          <div className="text-slate-300">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-500 font-sans font-medium">Follow-ups</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">{dateFollowUps.length}</span>
          </div>
        </div>

        {/* Core Wireframe Blueprint Content */}
        <div className="p-6 space-y-6">
          
          {/* SECTION 1: CLIENT UPDATES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <FileText className="w-4 h-4" /> CLIENT UPDATES FOR {activeDate}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{dateUpdates.length} Records</span>
            </div>
            
            {dateUpdates.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                No updates logged on this date. Click "+ Add Update" above to log a record for {activeDate}.
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {dateUpdates.map((up) => (
                  <div key={up.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center space-x-4">
                      <span className="text-blue-700 font-bold">
                        {new Date(up.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-slate-800">
                        <strong className="text-blue-800 font-sans">{up.clientName}:</strong> {up.message}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                      {up.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: MEETINGS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                <Video className="w-4 h-4" /> MEETINGS SCHEDULED FOR {activeDate}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{dateMeetings.length} Meetings</span>
            </div>

            {dateMeetings.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                No meetings scheduled on this date.
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {dateMeetings.map((meet) => (
                  <div key={meet.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-700 font-bold">
                        {new Date(meet.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-slate-900 font-sans font-semibold">
                        {meet.title} ({meet.clientName})
                      </span>
                    </div>
                    {meet.meetLink ? (
                      <a
                        href={meet.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold flex items-center space-x-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>[Open Google Meet]</span>
                      </a>
                    ) : (
                      <span className="text-slate-500">{meet.status}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 3: TASKS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                <CheckSquare className="w-4 h-4" /> TASKS DUE ON {activeDate}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{dateTasks.length} Tasks</span>
            </div>

            {dateTasks.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                No tasks due on this date.
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {dateTasks.map((t) => (
                  <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <span className="text-slate-800 font-sans font-medium">{t.title} ({t.clientName})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 4: FOLLOW-UPS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-rose-700 flex items-center gap-2">
                <Clock className="w-4 h-4" /> FOLLOW-UPS FOR {activeDate}
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{dateFollowUps.length} Items</span>
            </div>

            {dateFollowUps.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                No follow-up reminders set for this date.
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {dateFollowUps.map((fl) => (
                  <div key={fl.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <span className="text-slate-800 font-sans font-medium">{fl.title} ({fl.clientName})</span>
                    </div>
                    <span className="text-rose-700 font-bold">{fl.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Operational Quick Actions Summary Table */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
            Category Breakdown for {activeDate}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">CATEGORY BREAKDOWN</th>
                  <th className="p-3 text-center">TOTAL COUNT</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3 font-semibold text-blue-700">Client & Internal Updates</td>
                  <td className="p-3 text-center font-bold font-mono text-slate-900">{dateUpdates.length}</td>
                  <td className="p-3 text-slate-600">{dateUpdates.length > 0 ? 'Active Logs' : 'Clear'}</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3 font-semibold text-emerald-700">Scheduled Meetings</td>
                  <td className="p-3 text-center font-bold font-mono text-slate-900">{dateMeetings.length}</td>
                  <td className="p-3 text-slate-600">{dateMeetings.length > 0 ? 'Calendar Synced' : 'No Meetings'}</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3 font-semibold text-indigo-700">Tasks Due</td>
                  <td className="p-3 text-center font-bold font-mono text-slate-900">{dateTasks.length}</td>
                  <td className="p-3 text-slate-600">{dateTasks.length > 0 ? 'Tasks Pending' : 'Clear'}</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="p-3 font-semibold text-rose-700">Follow-up Action Items</td>
                  <td className="p-3 text-center font-bold font-mono text-slate-900">{dateFollowUps.length}</td>
                  <td className="p-3 text-slate-600">{dateFollowUps.length > 0 ? 'Follow-ups Actionable' : 'Clear'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function DailyDetailsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-mono">Loading Daily Workspace...</div>}>
      <DailyDetailsContent />
    </Suspense>
  );
}
