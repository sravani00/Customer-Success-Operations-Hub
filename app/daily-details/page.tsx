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
  Package, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check 
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

function DailyDetailsContent() {
  const searchParams = useSearchParams();
  const dateFromQuery = searchParams.get('date');
  const { currentDate, updates, meetings, offers, tasks, followUps, openQuickAdd } = useAppStore();

  const activeDate = dateFromQuery || currentDate;
  const [copied, setCopied] = React.useState(false);

  const handleCopySummary = () => {
    const summaryText = `Customer Success Operations Recap - ${activeDate}\n` +
      `Updates: ${updates.length} | Meetings: ${meetings.length} | Offers: ${offers.length} | Tasks: ${tasks.length} | Follow-ups: ${followUps.length}\n\n` +
      `Key Highlights:\n` +
      `- Client A: Performance review requested on Offer A (25k test cap)\n` +
      `- Client B: Shared new Q3 offer list\n` +
      `- Meetings: 2 Google Meet syncs executed\n` +
      `- Follow-ups: ${followUps.filter(f => f.status === 'Overdue').length} overdue items remaining`;
    
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
          className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Calendar</span>
        </Link>
        <button
          onClick={handleCopySummary}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-blue-400 flex items-center space-x-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Recap Copied!' : 'Export Daily Recap'}</span>
        </button>
      </div>

      {/* Daily Details Main Box Wireframe Blueprint (Spec Page 7) */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header Controls (Spec Page 2 & Page 7 Blueprint) */}
        <div className="p-5 bg-slate-950 border-b-2 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight font-mono">
                {activeDate === '2026-08-17' ? 'August 17, 2026' : activeDate}
              </h1>
              <p className="text-xs text-slate-400 font-sans">Centralized Daily Workspace & Operations Log</p>
            </div>
          </div>

          {/* Quick Add Action Buttons Bar */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <button
              onClick={() => openQuickAdd('update')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Update</span>
            </button>
            <button
              onClick={() => openQuickAdd('offer')}
              className="px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Offer</span>
            </button>
            <button
              onClick={() => openQuickAdd('task')}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Task</span>
            </button>
            <button
              onClick={() => openQuickAdd('followup')}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Follow-up</span>
            </button>
            <button
              onClick={() => openQuickAdd('meeting')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Meeting</span>
            </button>
          </div>
        </div>

        {/* Category Breakdown Totals Bar (Spec Page 7) */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-around font-mono text-xs font-bold text-slate-300 overflow-x-auto">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-400 font-sans font-medium">Updates</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">8</span>
          </div>
          <div className="text-slate-700">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-400 font-sans font-medium">Meetings</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">3</span>
          </div>
          <div className="text-slate-700">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-400 font-sans font-medium">Offers</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">6</span>
          </div>
          <div className="text-slate-700">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-400 font-sans font-medium">Tasks</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">7</span>
          </div>
          <div className="text-slate-700">│</div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-slate-400 font-sans font-medium">Follow-ups</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">4</span>
          </div>
        </div>

        {/* Core Wireframe Blueprint Content (Spec Page 7) */}
        <div className="p-6 space-y-6">
          
          {/* SECTION 1: CLIENT UPDATES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> CLIENT UPDATES
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Real-time sync</span>
            </div>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-4">
                  <span className="text-blue-400 font-bold">10:32 AM</span>
                  <span className="text-slate-200">Client A requested Offer A performance review</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">Client</span>
              </div>
              
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-4">
                  <span className="text-blue-400 font-bold">11:15 AM</span>
                  <span className="text-slate-200">Client B shared new campaign offer list</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">Client</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: MEETINGS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Video className="w-4 h-4" /> MEETINGS
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Google Meet Integrated</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-400 font-bold">11:00 AM</span>
                  <span className="text-slate-200">Client A Weekly Sync</span>
                </div>
                <a
                  href="https://meet.google.com/abc-defg-hij"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-[11px] font-bold flex items-center space-x-1"
                >
                  <Video className="w-3 h-3" />
                  <span>[Open Meet]</span>
                </a>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-400 font-bold">04:00 PM</span>
                  <span className="text-slate-200">Internal Campaign Strategy Review</span>
                </div>
                <span className="text-[11px] text-slate-500 font-sans">Internal Team</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: OFFERS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Package className="w-4 h-4" /> OFFERS
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Live Campaign Capping & Rev</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3">OFFER</th>
                    <th className="py-2 px-3">STATUS</th>
                    <th className="py-2 px-3">CAP / VOLUME</th>
                    <th className="py-2 px-3">REVENUE</th>
                    <th className="py-2 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3 font-bold text-white">Offer A</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Testing</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">25,000 Cap</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">$4,250 Rev</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link href="/offers/offer-a" className="text-blue-400 hover:underline">
                        [View Details]
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3 font-bold text-white">Offer B</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Pending</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">10,000 Cap</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">$2,100 Rev</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link href="/offers/offer-b" className="text-blue-400 hover:underline">
                        [View Details]
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3 font-bold text-white">Offer C</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">40,000 Cap</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">$12,400 Rev</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link href="/offers/offer-c" className="text-blue-400 hover:underline">
                        [View Details]
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 4: FOLLOW-UPS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> FOLLOW-UPS
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Action Items Checklist</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-slate-200">Offer A Performance Review</span>
                </div>
                <span className="text-rose-400 font-bold">Due Today</span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-slate-200">Offer B Testing Confirmation</span>
                </div>
                <span className="text-amber-400 font-bold">Due Aug 19</span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between opacity-70">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-200 line-through">Offer C Weekly Reporting</span>
                </div>
                <span className="text-emerald-400 font-bold">Completed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Category Breakdown & Quick Actions Summary Table (Spec Section 4 Page 2) */}
        <div className="p-6 bg-slate-950 border-t-2 border-slate-800 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
            Category Breakdown & Operational Quick Actions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">CATEGORY BREAKDOWN</th>
                  <th className="p-3 text-center">TOTAL COUNT</th>
                  <th className="p-3">QUICK ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-blue-300">Client Updates</td>
                  <td className="p-3 text-center font-bold font-mono">5</td>
                  <td className="p-3 text-slate-300">Filter / View Log</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-purple-300">Internal Updates</td>
                  <td className="p-3 text-center font-bold font-mono">3</td>
                  <td className="p-3 text-slate-300">Convert to Task</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-emerald-300">Meetings</td>
                  <td className="p-3 text-center font-bold font-mono">2</td>
                  <td className="p-3 text-slate-300">Open Google Meet Links</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-amber-300">Offers</td>
                  <td className="p-3 text-center font-bold font-mono">6</td>
                  <td className="p-3 text-slate-300">Review Conversion & EPC</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-indigo-300">Tasks</td>
                  <td className="p-3 text-center font-bold font-mono">4</td>
                  <td className="p-3 text-slate-300">Mark Complete</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-rose-300">Follow-ups</td>
                  <td className="p-3 text-center font-bold font-mono">3</td>
                  <td className="p-3 text-slate-300">Reschedule / Complete</td>
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
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading Daily Workspace...</div>}>
      <DailyDetailsContent />
    </Suspense>
  );
}
