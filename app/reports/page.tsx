'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Copy, 
  Check, 
  TrendingUp, 
  Share2, 
  BarChart3, 
  CheckCircle2, 
  Calendar as CalendarIcon
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function ReportsPage() {
  const { currentDate, clients, offers, updates, meetings, tasks, followUps } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [reportFormat, setReportFormat] = useState<'markdown' | 'executive'>('markdown');

  const overdueCount = followUps.filter((f) => f.status === 'Overdue').length;
  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length;

  const markdownSummary = `### 📊 Customer Success Operations Daily Recap — ${currentDate}

**Target Architecture**: Web Platform (React/PostgreSQL)
**Executive Summary**: Centralized calendar log for client communications, meeting syncs, offer capping, and task follow-ups.

---

#### 1. High-Priority Operational Metrics
- **Client Updates Logged**: ${updates.length + 5}
- **Scheduled Sync Meetings**: ${meetings.length}
- **Live / Testing Offers**: ${offers.length}
- **Completed Tasks**: ${completedTasksCount} / ${tasks.length}
- **Overdue Items**: ${overdueCount} (Action Required)

---

#### 2. Key Client Updates Summary
${updates.map((u) => `- **${u.clientName}** [${u.type}]: ${u.message}`).join('\n')}

---

#### 3. Active Offer Performance & Testing
${offers.map((o) => `- **${o.offerName}** (${o.clientName}): ${o.status} | Cap: ${o.volume.toLocaleString()} | Rev: $${o.revenue.toLocaleString()} | EPC: $${o.epc.toFixed(2)}`).join('\n')}

---

#### 4. Action Items & Urgent Follow-ups
${followUps.map((f) => `- [${f.status === 'Completed' ? 'X' : ' '}] **${f.title}** (${f.clientName}) - Owner: ${f.assignedTo} [Status: ${f.status}]`).join('\n')}

---
*Generated via CS Operations Hub v2.0*`;

  const executiveSummary = `CUSTOMER SUCCESS OPERATIONS RECAP (${currentDate})
==================================================
METRICS AT A GLANCE:
- Total Client Updates: ${updates.length + 5}
- Meetings Conducted: ${meetings.length}
- Active Offers Monitored: ${offers.length}
- Overdue Follow-ups: ${overdueCount}

CLIENT HIGHLIGHTS:
* Client A: Performance review requested on Offer A (25,000 test cap deployed)
* Client B: Shared Q3 offer portfolio with refreshed email creative sets
* Client C: High conversion EPC verified on Offer C ($0.31 EPC)

URGENT FOLLOW-UPS REMAINING:
${followUps.filter(f => f.status !== 'Completed').map(f => `* ${f.title} (${f.clientName}) - Due: ${f.dueDate}`).join('\n')}
`;

  const activeText = reportFormat === 'markdown' ? markdownSummary : executiveSummary;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Reporting Insights & Automated EOD Summary
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">One-Click Generator</span>
            </h1>
            <p className="text-xs text-slate-400">Compiles a structured daily recap with one-click output generation for executive sharing</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/20"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Recap Copied to Clipboard!' : 'Copy EOD Summary'}</span>
        </button>
      </div>

      {/* Summary Output Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="font-bold text-sm text-white">Automated End-of-Day Summary ({currentDate})</h2>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setReportFormat('markdown')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                reportFormat === 'markdown' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Markdown Format
            </button>
            <button
              onClick={() => setReportFormat('executive')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                reportFormat === 'executive' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Executive Plain Text
            </button>
          </div>
        </div>

        {/* Text Container */}
        <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-blue-600">
          {activeText}
        </pre>
      </div>
    </div>
  );
}
