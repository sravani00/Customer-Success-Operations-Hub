'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Copy, 
  Check, 
  Users, 
  Building, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Calendar as CalendarIcon,
  Video,
  FileText,
  Clock,
  Package,
  Share2,
  Filter
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function ReportsPage() {
  const { currentDate, clients, offers, updates, meetings, tasks, followUps } = useAppStore();

  const [selectedClientId, setSelectedClientId] = useState<string>('all');
  const [reportFormat, setReportFormat] = useState<'markdown' | 'executive'>('markdown');
  const [copied, setCopied] = useState(false);

  // Selected Client object (or null if all)
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  // Filtered data for selected client
  const clientUpdates = selectedClientId === 'all' 
    ? updates 
    : updates.filter((u) => u.clientId === selectedClientId);

  const clientMeetings = selectedClientId === 'all' 
    ? meetings 
    : meetings.filter((m) => m.clientId === selectedClientId);

  const clientOffers = selectedClientId === 'all' 
    ? offers 
    : offers.filter((o) => o.clientId === selectedClientId);

  const clientTasks = selectedClientId === 'all' 
    ? tasks 
    : tasks.filter((t) => t.clientId === selectedClientId);

  const clientFollowUps = selectedClientId === 'all' 
    ? followUps 
    : followUps.filter((f) => f.clientId === selectedClientId);

  const overdueCount = clientFollowUps.filter((f) => f.status === 'Overdue').length;
  const completedTasksCount = clientTasks.filter((t) => t.status === 'Completed').length;

  // Generate Markdown Summary Text
  const generateMarkdownReport = () => {
    if (selectedClientId === 'all') {
      return `### 📊 Customer Success Operations Daily Recap — ${currentDate}

**Scope**: All Client Accounts & Operations Center
**Executive Summary**: Centralized operational recap for client updates, meeting syncs, active offer tracking, task completion, and urgent follow-ups.

---

#### 1. High-Priority Operational Metrics
- **Total Client Accounts**: ${clients.length}
- **Client Updates Logged**: ${updates.length}
- **Scheduled Sync Meetings**: ${meetings.length}
- **Live / Active Offers**: ${offers.length}
- **Tasks Progress**: ${completedTasksCount} / ${tasks.length} Completed
- **Overdue Items**: ${overdueCount} (Requires Attention)

---

#### 2. Client Updates Summary
${updates.length > 0 
  ? updates.map((u) => `- **${u.clientName}** [${u.type}]: ${u.message}`).join('\n') 
  : '- No updates logged.'}

---

#### 3. Scheduled Meetings
${meetings.length > 0 
  ? meetings.map((m) => `- **${m.title}** (${m.clientName}) | Time: ${new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`).join('\n') 
  : '- No meetings scheduled.'}

---

#### 4. Action Items & Follow-ups
${followUps.length > 0 
  ? followUps.map((f) => `- [${f.status === 'Completed' ? 'X' : ' '}] **${f.title}** (${f.clientName}) - Owner: ${f.assignedTo} [Status: ${f.status}]`).join('\n') 
  : '- No follow-ups pending.'}

---
*Generated via Customer Success Operations Hub v2.0*`;
    }

    const c = selectedClient!;
    return `### 🏢 Client Performance & Operations Report: ${c.name} (${c.company})

**Active Date**: ${currentDate}
**Account Category**: ${c.subModule}
**Industry**: ${c.industry}
**Account Status**: ${c.status}
**Primary Contact**: ${c.primaryContact.name} (${c.primaryContact.role} | ${c.primaryContact.email} | ${c.primaryContact.phone})

---

#### 1. Client Metrics Overview
- **Category Focus / Traffic Volume**: ${c.metricsSummary || 'Standard Account'}
- **Client Updates Logged**: ${clientUpdates.length}
- **Meetings Scheduled**: ${clientMeetings.length}
- **Offers / Campaigns Monitored**: ${clientOffers.length}
- **Tasks Assigned**: ${completedTasksCount} / ${clientTasks.length} Completed
- **Overdue Follow-ups**: ${overdueCount}

---

#### 2. Client Updates Log
${clientUpdates.length > 0 
  ? clientUpdates.map((u) => `- [${u.type}] ${u.message} (${new Date(u.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`).join('\n') 
  : '- No client updates recorded.'}

---

#### 3. Scheduled Sync Meetings
${clientMeetings.length > 0 
  ? clientMeetings.map((m) => `- **${m.title}** | Time: ${new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | Link: ${m.meetLink || 'N/A'}`).join('\n') 
  : '- No meetings scheduled.'}

---

#### 4. Active Offers & Campaigns
${clientOffers.length > 0 
  ? clientOffers.map((o) => `- **${o.offerName}** (${o.offerCode}) | Status: ${o.status} | Volume: ${o.volume.toLocaleString()} | Revenue: $${o.revenue.toLocaleString()} | EPC: $${o.epc.toFixed(2)}`).join('\n') 
  : '- No linked offers recorded.'}

---

#### 5. Pending Action Items & Follow-ups
${clientFollowUps.length > 0 
  ? clientFollowUps.map((f) => `- [${f.status === 'Completed' ? 'X' : ' '}] **${f.title}** - Due: ${f.dueDate} [Owner: ${f.assignedTo}]`).join('\n') 
  : '- No pending action items.'}

---
*Report Generated for ${c.company} via CS Operations Hub v2.0*`;
  };

  // Generate Executive Plain Text
  const generateExecutiveReport = () => {
    if (selectedClientId === 'all') {
      return `CUSTOMER SUCCESS OPERATIONS EXECUTIVE RECAP (${currentDate})
====================================================================
SCOPE: All Client Accounts & Operations

METRICS AT A GLANCE:
- Total Accounts: ${clients.length}
- Total Updates: ${updates.length}
- Meetings Conducted/Scheduled: ${meetings.length}
- Active Offers: ${offers.length}
- Overdue Follow-ups: ${overdueCount}

OPERATIONAL HIGHLIGHTS:
${updates.slice(0, 5).map((u) => `* ${u.clientName}: ${u.message}`).join('\n')}

UPCOMING MEETINGS:
${meetings.map((m) => `* ${m.title} (${m.clientName})`).join('\n')}
`;
    }

    const c = selectedClient!;
    return `CLIENT OPERATIONS REPORT: ${c.name} - ${c.company} (${currentDate})
====================================================================
ACCOUNT DETAILS:
- Category: ${c.subModule}
- Industry: ${c.industry}
- Primary Contact: ${c.primaryContact.name} (${c.primaryContact.email})
- Status: ${c.status}
- Summary Metrics: ${c.metricsSummary || 'N/A'}

RECENT LOGS & UPDATES:
${clientUpdates.length > 0 ? clientUpdates.map((u) => `* ${u.message}`).join('\n') : '* No recent updates logged.'}

SCHEDULED MEETINGS:
${clientMeetings.length > 0 ? clientMeetings.map((m) => `* ${m.title} at ${new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`).join('\n') : '* No upcoming meetings.'}

ACTIVE CAMPAIGNS & OFFERS:
${clientOffers.length > 0 ? clientOffers.map((o) => `* ${o.offerName}: ${o.status} ($${o.revenue} revenue, $${o.epc} EPC)`).join('\n') : '* No active campaigns.'}

ACTION ITEMS:
${clientFollowUps.length > 0 ? clientFollowUps.map((f) => `* [${f.status}] ${f.title} (Owner: ${f.assignedTo})`).join('\n') : '* No pending action items.'}
`;
  };

  const reportContent = reportFormat === 'markdown' ? generateMarkdownReport() : generateExecutiveReport();

  const handleCopy = () => {
    navigator.clipboard.writeText(reportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Reports & Client Intelligence
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                Interactive Generator
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any client account below to instantly generate a tailored operational report & executive summary
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-2 shadow-xs transition-all self-start md:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Report Copied to Clipboard!' : 'Copy Client Report'}</span>
        </button>
      </div>

      {/* Client Selection Bar & Format Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Client Selector Dropdown */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 uppercase tracking-wider shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Select Client Report:</span>
          </div>

          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[240px]"
          >
            <option value="all">🌐 All Clients (Executive Hub Recap)</option>
            <optgroup label="Client Accounts Directory">
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  🏢 {c.name} — {c.company} ({c.subModule})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Format Selector */}
        <div className="flex items-center space-x-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs shrink-0 self-start md:self-auto">
          <button
            onClick={() => setReportFormat('markdown')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              reportFormat === 'markdown' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Markdown Format
          </button>
          <button
            onClick={() => setReportFormat('executive')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              reportFormat === 'executive' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Executive Plain Text
          </button>
        </div>
      </div>

      {/* Selected Client Overview Card (Shown if specific client selected) */}
      {selectedClient && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-xs">
                {selectedClient.name.replace('Client ', '')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {selectedClient.name} — {selectedClient.company}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                    {selectedClient.subModule}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>Industry: {selectedClient.industry}</span>
                  <span>•</span>
                  <span>Status: <strong className="text-emerald-700">{selectedClient.status}</strong></span>
                </p>
              </div>
            </div>

            <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-500 block font-semibold text-[10px] uppercase tracking-wider">Primary Contact:</span>
              <div className="text-slate-900 font-semibold">{selectedClient.primaryContact.name} ({selectedClient.primaryContact.role})</div>
              <div className="text-slate-500 text-[11px] flex items-center gap-3">
                <span>✉️ {selectedClient.primaryContact.email}</span>
                <span>📞 {selectedClient.primaryContact.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Updates Logged:</span>
              <span className="font-bold text-blue-700 font-mono text-sm">{clientUpdates.length}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Meetings:</span>
              <span className="font-bold text-emerald-700 font-mono text-sm">{clientMeetings.length}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Active Offers:</span>
              <span className="font-bold text-amber-700 font-mono text-sm">{clientOffers.length}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Tasks Completed:</span>
              <span className="font-bold text-indigo-700 font-mono text-sm">{completedTasksCount} / {clientTasks.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Generated Report Output Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="font-bold text-sm text-slate-900">
              Generated Operational Report {selectedClient ? `for ${selectedClient.name} (${selectedClient.company})` : `(All Clients)`}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Date: {currentDate}</span>
        </div>

        {/* Text Code Container */}
        <pre className="p-5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-blue-100">
          {reportContent}
        </pre>
      </div>
    </div>
  );
}
